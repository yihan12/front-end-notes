---
title: 【tinymce】之图片上传
date:
tags: [前端, tinymce]
categories: [前端, tinymce, tools]
---

### 概览

> 媒体插件为用户增加了将 HTML5 视频和音频元素添加到可编辑区域的能力。它还在“插入”菜单下添加了“插入/编辑视频”项目以及工具栏按钮。

由于，是之前老项目的 tinymce，对其进行相关的优化，并且不影响老项目其他引用模块，只对相应的 media 上传进行设置。

本文主要针对【media 的基本配置】、【视频不能正常显示 bug】、【视频不能选中删除的 bug】、以及【自定义上传】进行描述和解决。

需要注意的是本文针对的 tinymce 版本是 v4，其他高版本不一定适用。

### 基本设置

这里的基本设置，是配置 tinymce 需要配置的工具。初始化时，必须的属性

- selector :tinymce 需要配置的相应 html，如'#tinydemo4'
- plugins: 必须的插件
- toolbar：必须的工具栏

```javascript
tinymce.init({
  selector: 'textarea', // change this value according to your HTML
  plugins: 'media',
  menubar: 'insert',
  toolbar: 'media',
})
```

### 额外设置

#### media_live_embeds 媒体实时预览开关

开启此选项后，用户可看到编辑区内嵌入视频的实时预览，而不是占位图。
**取值： true / false**
**默认： true**
此设置对 video 无效

#### audio_template_callback 自定义插入音频代码

```javascript
tinymce.init({
  selector: '#tinydemo',
  plugins: 'media',
  toolbar: 'media',
  audio_template_callback: function (data) {
    return (
      '<audio controls>' +
      '\n<source src="' +
      data.source1 +
      '"' +
      (data.source1mime ? ' type="' + data.source1mime + '"' : '') +
      ' />\n' +
      '</audio>'
    )
  },
})
```

#### video_template_callback 自定义插入视频代码

很多文章都是如此配置，但是会出现下面的问题：

- 视频不展示，无法在 tinymce 编辑器播放
- 视频不能像图片一样进行删除

### 解决视频选中，删除问题的方法

利用 media_url_resolver 进行返回

```javascript
media_live_embeds: true, // 媒体实时预览开关
// 自定义插入视频代码
media_url_resolver: (data, resolve) => {
  try {
    let videoUri = encodeURI(data.url);
    console.log('media_url_resolverdata===========', data);
    let embedHtml = `<p
                    class="mce-preview-object mce-object-video"
                    contenteditable="false"
                    data-mce-object="video"
                    data-mce-p-allowfullscreen="allowfullscreen"
                    data-mce-p-frameborder="no"
                    data-mce-p-scrolling="no"
                    data-mce-p-src=${videoUri} >
                    <video src=${data.url} width="100%" height="auto" controls="controls">
                      <source src="${data.url}"/>
                    </video>
                    <br data-mce-bogus="1">
                </p>`;
    resolve({ html: embedHtml });
    //  controlslist="nodownload"
  } catch (e) {
    resolve({ html: '' });
  }
},
```

### 自定义文件上传

```javascript
tinymce.init({
  selector: '#tinydemo4',
  language: 'zh_CN',
  plugins: 'link',
  toolbar: 'link',
  file_picker_callback: function (callback, value, meta) {
    //文件分类
    var filetype =
      '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4'
    //后端接收上传文件的地址
    var upurl = '/demo/upfile.php'
    //为不同插件指定文件类型及后端地址
    switch (meta.filetype) {
      case 'image':
        filetype = '.jpg, .jpeg, .png, .gif'
        upurl = 'upimg.php'
        break
      case 'media':
        filetype = '.mp3, .mp4'
        upurl = 'upfile.php'
        break
      case 'file':
      default:
    }
    //模拟出一个input用于添加本地文件
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', filetype)
    input.click()
    input.onchange = function () {
      var file = this.files[0]

      var xhr, formData
      console.log(file.name)
      xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', upurl)
      xhr.onload = function () {
        var json
        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status)
          return
        }
        json = JSON.parse(xhr.responseText)
        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          return
        }
        callback(json.location)
      }
      formData = new FormData()
      formData.append('file', file, file.name)
      xhr.send(formData)

      //下方被注释掉的是官方的一个例子
      //放到下面给大家参考

      /*var reader = new FileReader();
            reader.onload = function () {
                // Note: Now we need to register the blob in TinyMCEs image blob
                // registry. In the next release this part hopefully won't be
                // necessary, as we are looking to handle it internally.
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // call the callback and populate the Title field with the file name
                callback(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);*/
    }
  },
})
```

### 参考链接

- [tinymce 中文文档](http://tinymce.ax-z.cn/general/upload-images.php)
- [tinymce 官方文档](https://www.tiny.cloud/docs/tinymce/latest/upload-images/)
- [视频处理](https://www.bilibili.com/read/cv22042918/)
