$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__message-list__box">
         <div class="main-chat__message-list__box__user-day">
           <div class="main-chat__message-list__box__user-day__user">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__box__user-day__day">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__box__message">
           ${message.content}
           <div class="main-chat__message-list__box__message__image">
            <img src=${message.image} >
           </div>
         </div>
       </div>`
     return html;
   } else {
     var html =
      `<div class="main-chat__message-list__box">
         <div class="main-chat__message-list__box__user-day">
           <div class="main-chat__message-list__box__user-day__user">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__box__user-day__day">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__box__message">
           ${message.content}
         </div>
       </div>`
     return html;
   };
 }
  $('#new_message').on('submit' , function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.main-chat__message-form__box__submit').prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});