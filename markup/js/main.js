// eslint-disable-next-line
'use strict';

// логика выбора даты в календаре

let calendar = document.querySelector('.calendar');
if (calendar) {
  let dates = calendar.querySelector('.calendar__dates');
  let selectedDate = dates.querySelector('.calendar__date--selected');

  let changeDateHandler = (evt) => { // переключает класс выбранной даты
    if (evt.target.classList.contains('calendar__date')) {
      let date = evt.target;
      if (!date.classList.contains('calendar__date--disabled')) {
        if (selectedDate) {
          selectedDate.classList.remove('calendar__date--selected');
        }
        date.classList.add('calendar__date--selected');
        selectedDate = date;
      }
    }
  };

  if (dates) {
    dates.addEventListener('click', changeDateHandler);
  }
}

// переключение формы по табу
let popup = document.querySelector('.popup');
if (popup) {
  let tabs = popup.querySelectorAll('.popup__tab');

  if (tabs) {
    let tabForms = popup.querySelectorAll('.popup__form');
    let activeTab = popup.querySelector('.popup__tab--active');
    let activeForm = popup.querySelector('.popup__form--active');
    for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i];
      let form = tabForms[i];
      tab.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__tab-switcher') && evt.currentTarget !== activeTab) {
          activeTab.classList.remove('popup__tab--active');
          tab.classList.add('popup__tab--active');
          activeTab = tab;
          activeForm.classList.remove('popup__form--active');
          activeForm.classList.add('popup__form--hidden');
          form.classList.add('popup__form--active');
          form.classList.remove('popup__form--hidden');
          activeForm = form;
        }
      });
    }
  }
}

// меняет высоту поля textarea в блоке comments в зависимости от количества введенных в него строк.

// let comments = document.querySelector('.post__comments');
// let publication = document.querySelector('.new-publication');
// let textarea = null;

// if (comments || publication) {
//   textarea = document.querySelectorAll('textarea');
// }
const map = (typeof Map === 'function') ? new Map() : (function () {
  const keys = [];
  const values = [];

  return {
    has(key) {
      return keys.indexOf(key) > -1;
    },
    get(key) {
      return values[keys.indexOf(key)];
    },
    set(key, value) {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        values.push(value);
      }
    },
    delete(key) {
      const index = keys.indexOf(key);
      if (index > -1) {
        keys.splice(index, 1);
        values.splice(index, 1);
      }
    },
  };
})();

let createEvent = (name) => new Event(name, {
  bubbles: true
});
try {
  createEvent('test');
} catch (e) {
  // IE does not support `new Event()`
  createEvent = (name) => {
    const evt = document.createEvent('Event');
    evt.initEvent(name, true, false);
    return evt;
  };
}

function assign(ta) {
  if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) {
    return;
  }

  let heightOffset = null;
  let clientWidth = null;
  let cachedHeight = null;

  function init() {
    const style = window.getComputedStyle(ta, null);

    if (style.resize === 'vertical') {
      ta.style.resize = 'none';
    } else if (style.resize === 'both') {
      ta.style.resize = 'horizontal';
    }

    if (style.boxSizing === 'content-box') {
      heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
    } else {
      heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    }
    // Fix when a textarea is not on document body and heightOffset is Not a Number
    if (isNaN(heightOffset)) {
      heightOffset = 0;
    }

    update();
  }

  function changeOverflow(value) {
    {
      // Chrome/Safari-specific fix:
      // When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
      // made available by removing the scrollbar. The following forces the necessary text reflow.
      const width = ta.style.width;
      ta.style.width = '0px';
      // Force reflow:
      /* jshint ignore:start */
      // ta.offsetWidth;
      /* jshint ignore:end */
      ta.style.width = width;
    }

    ta.style.overflowY = value;
  }

  function getParentOverflows(el) {
    const arr = [];

    while (el && el.parentNode && el.parentNode instanceof Element) {
      if (el.parentNode.scrollTop) {
        arr.push({
          node: el.parentNode,
          scrollTop: el.parentNode.scrollTop,
        });
      }
      el = el.parentNode;
    }

    return arr;
  }

  function resize() {
    if (ta.scrollHeight === 0) {
      // If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
      return;
    }

    const overflows = getParentOverflows(ta);
    const docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

    ta.style.height = '';
    ta.style.height = (ta.scrollHeight + heightOffset) + 'px';

    // used to check if an update is actually necessary on window.resize
    clientWidth = ta.clientWidth;

    // prevents scroll-position jumping
    overflows.forEach(el => {
      el.node.scrollTop = el.scrollTop;
    });

    if (docTop) {
      document.documentElement.scrollTop = docTop;
    }
  }

  function renew() {
    resize();

    const styleHeight = Math.round(parseFloat(ta.style.height));
    const computed = window.getComputedStyle(ta, null);

    // Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
    let actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

    // The actual height not matching the style height (set via the resize method) indicates that
    // the max-height has been exceeded, in which case the overflow should be allowed.
    if (actualHeight < styleHeight) {
      if (computed.overflowY === 'hidden') {
        changeOverflow('scroll');
        resize();
        actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
      }
    } else {
      // Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
      if (computed.overflowY !== 'hidden') {
        changeOverflow('hidden');
        resize();
        actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
      }
    }

    if (cachedHeight !== actualHeight) {
      cachedHeight = actualHeight;
      const evt = createEvent('autosize:resized');
      try {
        ta.dispatchEvent(evt);
      } catch (err) {
        // Firefox will throw an error on dispatchEvent for a detached element
        // https://bugzilla.mozilla.org/show_bug.cgi?id=889376
      }
    }
  }

  const pageResize = () => {
    if (ta.clientWidth !== clientWidth) {
      renew();
    }
  };

  const kill = (style => {
    window.removeEventListener('resize', pageResize, false);
    ta.removeEventListener('input', renew, false);
    ta.removeEventListener('keyup', renew, false);
    ta.removeEventListener('autosize:kill', kill, false);
    ta.removeEventListener('autosize:renew', renew, false);

    Object.keys(style).forEach(key => {
      ta.style[key] = style[key];
    });

    map.delete(ta);
  }).bind(ta, {
    height: ta.style.height,
    resize: ta.style.resize,
    overflowY: ta.style.overflowY,
    overflowX: ta.style.overflowX,
    wordWrap: ta.style.wordWrap,
  });

  ta.addEventListener('autosize:kill', kill, false);

  // IE9 does not fire onpropertychange or oninput for deletions,
  // so binding to onkeyup to catch most of those events.
  // There is no way that I know of to detect something like 'cut' in IE9.
  if ('onpropertychange' in ta && 'oninput' in ta) {
    ta.addEventListener('keyup', renew, false);
  }

  window.addEventListener('resize', pageResize, false);
  ta.addEventListener('input', renew, false);
  ta.addEventListener('autosize:renew', renew, false);
  ta.style.overflowX = 'hidden';
  ta.style.wordWrap = 'break-word';

  map.set(ta, {
    kill,
    renew,
  });

  init();
}

function destroy(ta) {
  const methods = map.get(ta);
  if (methods) {
    methods.destroy();
  }
}

function update(ta) {
  const methods = map.get(ta);
  if (methods) {
    methods.update();
  }
}

let autosize = null;

// Do nothing in Node.js environment and IE8 (or lower)
if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
  autosize = el => el;
  autosize.destroy = el => el;
  autosize.update = el => el;
} else {
  autosize = (el, options) => {
    if (el) {
      Array.prototype.forEach.call(el.length ? el : [el], x => assign(x, options));
    }
    return el;
  };
  autosize.destroy = el => {
    if (el) {
      Array.prototype.forEach.call(el.length ? el : [el], destroy);
    }
    return el;
  };
  autosize.update = el => {
    if (el) {
      Array.prototype.forEach.call(el.length ? el : [el], update);
    }
    return el;
  };
}

// if (textarea) {
//   textarea.forEach(element => {
//     autosize(element);
//   });
// }
