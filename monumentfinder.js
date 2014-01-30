(function(){
/* ^ Globals are for bad PHP developers */

/* Grab all the DOM elements, will you? */

  var container = document.querySelector('.names');
  var input = document.querySelector('#name');
  var tag = document.querySelector('.nametag');
  var textlocation = document.querySelector('.textlocation');
  var f = document.querySelector('form');

/* for positioning magic, you'll see! */
  var sides = ['front','left','back','right'];
  var highlight, all;

/* Load data via Ajax, it is what the cool kids do */
  var givememydatadamnit = new XMLHttpRequest();
  givememydatadamnit.onload = function() {
    if (givememydatadamnit.status === 200) {
      names = JSON.parse(givememydatadamnit.responseText);
      all = names.monument.length;
      container.innerHTML = '';
      document.body.className = 'dataloaded';
    }
    else {
      container.innerHTML = '<p>Data could not be loaded, sorry.</p>';
    }
  };
  givememydatadamnit.onerror = function(e) {
    console.log('some serious Ajax error, yo');
    console.log(e);
  };
  givememydatadamnit.open('GET', 'mozmonument.json');
  givememydatadamnit.send();

/* Find names when the form is submitted (you know, mouse and touch people) */
  f.addEventListener('submit', function(ev) {
    findnames();
    ev.preventDefault();
  }, false);

/* 
   Find names when the cooler kids type in the field, 
   immediate response and such 
*/
  input.addEventListener('keyup', function(ev) {
    findnames();
    ev.preventDefault();
  }, false);


/* 
  When a name in the result set is clicked on (could be mouse or dirty fingers)
*/
  container.addEventListener('click', function(ev) {
    // If a link was clicked
    if (ev.target.tagName === 'A') {
      // remove old highlight
      if (highlight) {
        highlight.className = '';
      }
      // set new highlight
      highlight = ev.target.parentNode;
      highlight.className = 'current';
      // Get the number from the href, and get the data
      var namedata = names.monument[ev.target.href.split('#')[1]];

      // move the yellow highlight to the face of the cube it should 
      // be in (using the side number)
      document.querySelector('.' + sides[namedata.side-1]).appendChild(tag);
      // ^ appendChild moves DOMNodes, I suppose jQuery doesn't tell you that, 
      //   huh?

      // Calculate the position of the yellow highlight from number and row
      tag.style.left = namedata.number * (100/12) + 'px';
      var topfromrow = namedata.row * (250/65);
      // if the name is in the lower panel, add more pixels
      if (namedata.panel === 'lower') {
        topfromrow += 250;
      }
      tag.style.top = topfromrow + 'px';
      textlocation.innerHTML = '<ul>' +
        '<li>Side: ' + namedata.side + '</li>' +
        '<li>' + namedata.panel + ' panel</li>' +
        '<li>Row: ' + namedata.row + '</li>' +
        '<li>Number: ' + namedata.number + '</li>' +
        '</ul>';
    }
    ev.preventDefault();
  }, false);

/* Totally, like, loop through the names and find stuff, yo */
  function findnames() {
    var searchname = document.querySelector('#name').value;
    // ^ funny thing - as querySelector is not a live node result, 
    //   you need to read it again to get the value change. 

    searchname = searchname.toLowerCase();
    // we don't need no stinking regex, this way we find character
    // sequences in names.

    var out = '<ul>';
    for (var i = 0; i < all; i++) {
      if (names.monument[i].name.toLowerCase().indexOf(searchname) !== -1) {
        out += '<li><a href="#'+i+'">' + names.monument[i].name + '</a></li>';
      }
    }
    if (out === '<ul>') {
      out += '<li>Sorry, couldn\'t find that...</li>';
    }
    out += '</ul>';
    container.innerHTML = out;
  }

})();