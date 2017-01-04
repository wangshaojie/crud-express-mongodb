var upDate = document.querySelector('#update');
var del = 	document.querySelector('#delete');
update.addEventListener('click', function () {
  fetch('login', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'leader_name': 'wangshaojie',
      'leader_email': 'I find your lack of faith disturbing.'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
});

del.addEventListener('click', function () {
  fetch('login', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'leader_name': 'w1',
    })
  }).then(function (response) {
    window.location.reload()
  })
})