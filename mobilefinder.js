(function(){
  var container = document.querySelector('.names');
  var input = document.querySelector('#name');
  var f = document.querySelector('form');
  var highlight;
  var all = names.length;
  f.addEventListener('submit', function(ev) {
    findnames();
    ev.preventDefault();
  }, false);
  input.addEventListener('keyup', function(ev) {
    findnames();
    ev.preventDefault();
  }, false);
  container.addEventListener('click', function(ev) {
    // If a link was clicked
    if (ev.target.tagName === 'A') {
      if (highlight) {
        highlight.className = '';
      }
      highlight = ev.target.parentNode;
      highlight.className = 'current';
    }
    ev.preventDefault();
  }, false);

  function findnames() {
    var searchname = document.querySelector('#name').value;
    searchname = searchname.toLowerCase();
    var out = '<ul>';
    for (var i = 0; i < all; i++) {
      if (names[i].n.toLowerCase().indexOf(searchname) !== -1) {
        out += '<li><a href="#'+i+'">' + names[i].n + '</a>'+
          '<ul>' +
          '<li>Side: ' + names[i].s + '</li>' +
          '<li>' + (names[i].p === 1 ? 'upper' : 'lower')  + ' panel</li>' +
          '<li>Row: ' + names[i].r + '</li>' +
          '<li>Number: ' + names[i].no + '</li>' +
          '</ul>'+
          '</li>';
      }
    }
    if (out === '<ul>') {
      out += '<li>Sorry, couldn\'t find that...</li>';
    }
    out += '</ul>';
    container.innerHTML = out;
  }

})();