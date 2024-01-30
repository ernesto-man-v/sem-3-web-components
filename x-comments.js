class XComments extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
    
        shadow.innerHTML = `
            <template id="comment-template">
                <x-comment-item />
            </template>

            <section class="comments comments--no-profile-img">
                <div class="margin-bottom-lg">
                    <div class="flex gap-sm flex-column flex-row@md justify-between items-center@md">
                        <div>
                            <h1 class="text-md">Comments</h1>
                        </div>
                    </div>
                </div>
                <ul id="comments-content" class="margin-bottom-lg">
                    <slot name="comment">
                </ul>
                
                <fieldset>
                    <legend class="form-legend">Add a new comment</legend>
                    <div class="margin-bottom-xs" style="display: flex; flex-direction: column"><label class="sr-only" for="name">Your name</label><input id="name" type="text"></div>
                    <div class="margin-bottom-xs" style="display: flex; flex-direction: column"><label class="sr-only" for="comment">Your comment</label> <textarea class="form-control width-100%" name="commentNewContent" id="comment"></textarea></div>
                    <div><button id="add-comment" class="btn btn--primary">Add comment</button></div>
                </fieldset>
            </section>
        `;

        const addComment = this.shadowRoot.getElementById('add-comment');
        const commentTemplate = this.shadowRoot.getElementById('comment-template');
        
        addComment.onclick = function() {
            const commentNode = commentTemplate.content.cloneNode(true);
            commentNode.firstElementChild.setAttribute('name', shadow.getElementById('name').value);
            commentNode.firstElementChild.setAttribute('comment', shadow.getElementById('comment').value);
            shadow.getElementById('comments-content').append(commentNode);
        };

      }
}