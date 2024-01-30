class XCommentItem extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
    
        shadow.innerHTML = `
            <li class="comments__comment">
                <div class="comments__content margin-top-3xs">
                    <div class="text-component text-sm text-component--tight read-more js-read-more read-more--loaded" data-characters="150" data-btn-class="comments__readmore-btn ">
                        <p><a href="#0" class="comments__author-name" rel="author">${this.getAttribute('name') || 'anonymous'}</a></p>
                        <p>${this.getAttribute('comment') || ''}</p>
                    </div>
                    <div class="margin-top-xs text-sm">
                        <div class="flex gap-2xs items-center"><button id="reply-button" class="comments__label-btn">Reply</button>  </div>
                    </div>

                    <div>
                        <ul id="reply-content-comments">
                            <slot name="reply-comment"></slot>
                        <ul>
                    </div>

                    <div id="reply-content" style="display: none">
                    <div class="margin-bottom-xs" style="display: flex; flex-direction: column"><input id="name" type="text" placeholder="name"></div>
                        <div class="margin-bottom-xs" style="display: flex; flex-direction: column"><textarea class="form-control width-100%" name="commentNewContent" id="comment"></textarea></div>
                        <div><button id="add-comment" class="btn btn--primary">Add comment</button></div>
                    </div>
                </div>
            </li>
        `;

        const replyButton = this.shadowRoot.getElementById('reply-button');
        const replyContent = this.shadowRoot.getElementById('reply-content');
        const addComment = this.shadowRoot.getElementById('add-comment');

        replyButton.onclick = function() {
            replyContent.style.display = 'block';
        };

        addComment.onclick = function() {
            const commentNode = document.createElement('x-comment-item');
            commentNode.setAttribute('name', shadow.getElementById('name').value);
            commentNode.setAttribute('comment', shadow.getElementById('comment').value);
            shadow.getElementById('reply-content-comments').append(commentNode);
            replyContent.style.display = 'none';
        };

      }
}