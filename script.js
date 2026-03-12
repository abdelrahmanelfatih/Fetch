const postIdInput = document.getElementById('postId');
const getPostBtn = document.getElementById('getPostBtn');
const inputError = document.getElementById('inputError');
const loadingText = document.getElementById('loadingText');
const postCard = document.getElementById('postCard');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const fetchError = document.getElementById('fetchError');


//Helper Functions:
function setError(message){
    inputError.textContent = message;
    postIdInput.classList.add('error');
    postIdInput.classList.remove('success');
}

function setSuccess(){
    inputError.textContent = '';
    postIdInput.classList.remove('error');
    postIdInput.classList.add('success');
}

function resetUI(){
    postCard.classList.add('hidden');
    fetchError.classList.add('hidden');
    loadingText.classList.add('hidden');
}

// VALIDATION FUNCTION
function validateInput(){
    const value = postIdInput.value.trim();

    if (value === ''){
        setError('Please enter a Post ID.');
        return false;
    }

    const num = Number(value);

    if (num < 1 || num > 100 || !Number.isInteger(num)){
        setError('Please enter a whole number between 1 and 100.');
        return false;
    }

    setSuccess();
    return true;
}

// THE FETCH FUNCTION (async/await)
async function getPost(){

    if (!validateInput()) return;

    const id = Number (postIdInput.value.trim());

    resetUI();
    loadingText.classList.remove('hidden');

    try{

        const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${id}`);

        if (!response.ok){
            throw new Error('Post not found.');
        }

        const data = await response.json();
         
        loadingText.classList.add('hidden');
        postTitle.textContent = data.title;
        postBody.textContent = data.body;
        postCard.classList.remove('hidden');
     } catch(error){
        loadingText.classList.add('hidden');
        fetchError.textContent = 'Error: ${error.message}';
        fetchError.classList.remove('hidden');
     }
}


getPostBtn.addEventListener('click', getPost);