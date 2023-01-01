const postDataForm = document.querySelector('.form-post-data');
const deleteBtn = document.querySelector('.delete-btn');
const postContainer = document.querySelector('.post-container');

const getData = async (body, type) => {
  try {
    const url = type === 'new' ? '' : postDataForm.getAttribute('data-id');

    const method = type === 'new' ? 'POST' : 'PATCH';

    const res = await fetch(`${window.location.origin}/api/v1/posts/${url}`, {
      method,
      body,
    });
    const data = await res.json();
    if (data.status === 'success')
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    const url = `${
      window.location.origin
    }/api/v1/posts/${postContainer.getAttribute('data-id')}`;
    const res = await fetch(url, { method: 'DELETE' });
    const data = await res.json();
    if (data.status === 'success')
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
  } catch (err) {
    console.error(err);
  }
};

if (postDataForm) {
  const inputImage = document.getElementById('image');
  const preview = document.querySelector('.image-preview');
  const editId = document.getElementById('edit');
  const newId = document.getElementById('new');

  postDataForm.addEventListener('change', () => {
    if (preview.firstChild) {
      preview.firstChild.src = URL.createObjectURL(inputImage.files[0]);
    } else {
      const imageEl = document.createElement('img');
      imageEl.src = URL.createObjectURL(inputImage.files[0]);
      preview.appendChild(imageEl);
    }
  });

  postDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    if (inputImage.files[0]) form.append('image', inputImage.files[0]);
    form.append('title', document.getElementById('title').value);
    if (newId) getData(form, 'new');
    if (editId) getData(form, 'edit');
  });
}

if (deleteBtn) deleteBtn.addEventListener('click', deleteData);
