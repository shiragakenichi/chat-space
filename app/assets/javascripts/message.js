$(function(){
  function buildPost(message){
    var addImage = message.image  ?  message.image : ''
    var addText = message.content ? message.content : ''
      var html = `<div class="message">
                 <div class="message__upper-info">
                 <div class="messge__upper-info__talker">
                 ${message.name}
                 </div>
                 <div class="message__upper-info__date">
                ${message.created_at}
                </div>
                </div>
                <div class="message__text">
                <p class="message__text__content">
                ${message.content}
                </p>
                <img class="message__text__image" src="${addImage}">
                </div>
                </div>`
      return html;

  }

    $('#new_message').on('submit', function(e){
      e.preventDefault()
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,  //同期通信でいう『パス』
        type: 'POST',  //同期通信でいう『HTTPメソッド』
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(message){
        var html = buildPost(message);
        
        $('.right-center').append(html)
        //$('.form__message').val('')
        $(`.new_message`)[0].reset();
        $('.form__submit').prop('disabled', false);
        
        })
      .fail(function(){
        alert('メッセージ送信に失敗しました')
  
    })
  })
})

