$(document).ready(function(){
  if(jQuery.fn.jnotifyInizialize){
  // Notify
  var topValue = '20px';
  if($(document.body).is(".ie7") || $(document.body).is(".ie6")){
	  topValue = '70px';
  }
	  
  $('<div id="Notification"></div>').appendTo("body");
  $('#Notification').jnotifyInizialize({oneAtTime: false, appendType: 'append'})
	.css({ 'position': 'absolute',
	    'marginTop': topValue,
	    'width': '300px',
	    'z-index': '9999999',
	    'disappearTime': '6000',
	    'line-height' : '20px'
	});
  
  var fixedFunOpts = {
			right : 0,//相对于页面宽度的右边定位
		    top: 50,
		    pageWidth : 950
			};

  fixedFun($("#Notification"), fixedFunOpts);
  }
  
  var refurl = document.referrer; 
  if(refurl && refurl.indexOf("localhost")<0 && refurl.indexOf("hualvtu.")<0 && refurl.indexOf("api.t.sina.com.cn")<0){
	 //showMessage(refurl); 
	 $.cookie("source", refurl);
  }    
});


  // Fixed its position
  var fixedFun = function(element, fixedFunOpts) {
	  var top = fixedFunOpts.top;
	  var right = ($(window).width()-fixedFunOpts.pageWidth)/2+fixedFunOpts.right;
	  element.css({
	      "right":right,
	      "top":top
	  });
	  $(window).resize(function(){
	      var right = ($(window).width()-fixedFunOpts.pageWidth)/2+fixedFunOpts.right;
	      element.css({
	          "right":right
	      });
	  });
	  $(window).scroll(function() {
	      var scrolls = $(this).scrollTop();
          element.css({
              top: scrolls + top
          });
          /*
	      if (scrolls > top) {	
	          if (window.XMLHttpRequest) {
	              element.css({
	                  position: "fixed",
	                  top: 0
	              });
	          } else {	        	  
	              element.css({
	                  top: scrolls + top
	              });
	          }
	      }else {
	          element.css({
	              position: "absolute",
	              top: top
	          });
	      }
	      */
	  });
  };
  
  
function showMessage(msg){
  $('#Notification').jnotifyAddMessage({
      text: msg,
      type: 'message',
      disappearTime: '5000'
    });		
}

function showMessage2(msg){
  $('#Notification').jnotifyAddMessage({
      text: msg,
      type: 'message',
      disappearTime: '60000'
    });		
}

function showMessage3(msg){
  $('#Notification').jnotifyAddMessage({
	  text: msg,
	  type: 'message',
	  disappearTime: '15000'
  });		
}

function showMessage4(msg){
	  $('#Notification').jnotifyAddMessage({
		  text: msg,
		  type: 'message',
		  disappearTime: '10000'
	  });		
	}

function showError(msg){
  $('#Notification').jnotifyAddMessage({
      text: msg,
      type: 'error',
      disappearTime: '5000'
    });		
}

function showError2(msg){
	  $('#Notification').jnotifyAddMessage({
	      text: msg,
	      type: 'error',
	      disappearTime: '10000'
	    });		
	}

function currentTime(){	
  var now= new Date();
  var year=now.getYear();
  var month=now.getMonth()+1;
  var day=now.getDate();
  var hour=now.getHours();
  var minute=now.getMinutes();
  var second=now.getSeconds();
  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

// 模板
HLTTmpl = {
	    tmpl_cache: {},
	    tmpl: function a(a, b) {
	        try {
	            var c = this.tmpl_cache[a];
	            if (!c) {
	                var d = "var p=[],print=function(){p.push.apply(p,arguments);};with( obj ){ p.push('" + a.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');";
	                c = new Function("obj", d),
	                this.tmpl_cache[a] = c
	            }
	            return c(b)
	        } catch(e) {
	            throw new Error("Template Error: " + e.message)
	        }
	    }
	};

// HTML代码解析
HLTHtml = {
	    encode: function(a) {
	        return a ? String(a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") : a
	    },
	    decode: function(a) {
	        return a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
	    },
	    stripTags: function(a) {
	        return a ? String(a).replace(/<\/?[^>]+>/gi, "") : a
	    },
	    nl2br: function(a) {
	    	if(!a) return "";
	        return a.replace(/\n/gim, "<br />")
	    },
	    br2nl: function(a) {
	    	if(!a) return "";
	        return a.replace(/<br \/>/g,'\n').replace(/<br>/g,'\n').replace(/<br\/>/g,'\n');;
	    }
	};

// 常用函数
HLTLang = {
    augmentObject: function(a, b) {
        for (var c in b) a[c] = b[c]
    },
    diff: function(a, b) {
        var c = {};
        for (var d in a) b[d] || (c[d] = a[d]);
        return c
    },
    diffByValue: function(a, b) {
        var c = {};
        for (var d in a) b[d] && a[d] !== b[d] && (c[d] = b[d]);
        return c
    },
    equals: function(a, b, c) {
        typeof c == "undefined" && (c = !0);
        if (typeof a != typeof b) return ! 1;
        if (typeof a != "object") {
            if (a !== b) return ! 1
        } else {
            if (a === null && a !== b) return ! 1;
            var d = Jux.Util.lang.objLength;
            if (d(a) !== d(b)) return ! 1;
            for (var e in a) {
                if (typeof a[e] != typeof b[e]) return ! 1;
                if (a[e] === null != (b[e] === null)) return ! 1;
                switch (typeof a[e]) {
                case "undefined":
                    if (typeof b[e] != "undefined") return ! 1;
                    break;
                case "object":
                    if (a[e] !== null && b[e] !== null && (a[e].constructor.toString() !== b[e].constructor.toString() || (c ? !Jux.Util.lang.equals(a[e], b[e]) : !1))) return ! 1;
                    break;
                case "function":
                    if (a[e].toString() != b[e].toString()) return ! 1;
                    break;
                default:
                    if (a[e] !== b[e]) return ! 1
                }
            }
        }
        return ! 0
    },
    escapeSpecialChars: function(a) {
        return String(a).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\'/g, "\\'").replace(/\"/g, '\\"')
    },
    isEmpty: function(a, b) {
        if (b) {
            for (var c in a) if (a.hasOwnProperty(c)) return ! 1
        } else for (var c in a) return ! 1;
        return ! 0
    },
    objLength: function(a, b) {
        var c = 0;
        if (b) for (var d in a) a.hasOwnProperty(d) && c++;
        else for (var d in a) c++;
        return c
    },
    inArray: function(a, b) {
        if (!Jux.isArray(b)) return ! 1;
        for (var c = 0; c < b.length; c++) {
            if (a instanceof RegExp && b[c].match(a)) return ! 0;
            if (b[c] instanceof RegExp && a.match(b[c])) return ! 0;
            if (b[c] == a) return ! 0
        }
        return ! 1
    },
    indexOfArray: function(a, b) {
        if (b.length) for (var c = 0; c < b.length; c++) if (b[c] === a) return c;
        return - 1
    },
    trim: function(a) {
        return a ? (a = a.replace(/^\s+|\s+$/g, ""), a) : ""
    },
    capitalizeFirst: function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    },
    shuffle: function(a) {
        if (a && a.length > 1) for (var b, c, d = a.length; d; b = parseInt(Math.random() * d, 10), c = a[--d], a[d] = a[b], a[b] = c);
        return a
    }
};
jQuery.fn.bullseye = function(a, b) {
    function d(a) {
        return a.data(c)
    }
    function e(a) {
        a.data(c, !0)
    }
    function f(a) {
        a.data(c, !1)
    }
    a = jQuery.extend({
        offsetTop: 0,
        offsetHeight: 0,
        extendDown: !1
    },
    a);
    var c = "is-focused";
    return this.each(function() {
        var c = $(this),
        g = $(b == null ? window: b),
        h = function() {
            var b = c.outerWidth(),
            h = c.outerHeight() + a.offsetHeight,
            i = g.width(),
            j = g.height(),
            k = g.scrollTop(),
            l = g.scrollLeft(),
            m = l + b,
            n = k + j,
            o = c.offset().left,
            p = o + b,
            q = c.offset().top + a.offsetTop,
            r = q + h,
            s = function() {
                d(c) || (e(c), c.trigger("enterviewport"))
            },
            t = function() {
                d(c) && (f(c), c.trigger("leaveviewport"))
            };
            n < q || (a.extendDown ? !1 : k > r) || m < o || m > p ? t() : s()
        };
        g.scroll(h).resize(h),
        h()
    })
};
window.Modernizr = function(a, b, c) {
    function B(a) {
        k.cssText = a
    }
    function C(a, b) {
        return B(o.join(a + ";") + (b || ""))
    }
    function D(a, b) {
        return typeof a === b
    }
    function E(a, b) {
        return !! ~ ("" + a).indexOf(b)
    }
    function F(a, b) {
        for (var d in a) if (k[a[d]] !== c) return b == "pfx" ? a[d] : !0;
        return ! 1
    }
    function G(a, b) {
        var c = a.charAt(0).toUpperCase() + a.substr(1),
        d = (a + " " + p.join(c + " ") + c).split(" ");
        return F(d, b)
    }
    var d = "2.0.6",
    e = {},
    f = !0,
    g = b.documentElement,
    h = b.head || b.getElementsByTagName("head")[0],
    i = "modernizr",
    j = b.createElement(i),
    k = j.style,
    l = b.createElement("input"),
    m = ":)",
    n = Object.prototype.toString,
    o = " -webkit- -moz- -o- -ms- -khtml- ".split(" "),
    p = "Webkit Moz O ms Khtml".split(" "),
    q = {
        svg: "http://www.w3.org/2000/svg"
    },
    r = {},
    s = {},
    t = {},
    u = [],
    v,
    w = function(a, c, d, e) {
        var f, h, j, k = b.createElement("div");
        if (parseInt(d, 10)) while (d--) j = b.createElement("div"),
        j.id = e ? e[d] : i + (d + 1),
        k.appendChild(j);
        return f = ["&shy;", "<style>", a, "</style>"].join(""),
        k.id = i,
        k.innerHTML += f,
        g.appendChild(k),
        h = c(k, a),
        k.parentNode.removeChild(k),
        !!h
    },
    x = function(b) {
        if (a.matchMedia) return matchMedia(b).matches;
        var c;
        return w("@media " + b + " { #" + i + " { position: absolute; } }",
        function(b) {
            c = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
        }),
        c
    },
    y = function() {
        function d(d, e) {
            e = e || b.createElement(a[d] || "div"),
            d = "on" + d;
            var f = d in e;
            return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = D(e[d], "function"), D(e[d], c) || (e[d] = c), e.removeAttribute(d))),
            e = null,
            f
        }
        var a = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return d
    } (),
    z = {}.hasOwnProperty,
    A; ! D(z, c) && !D(z.call, c) ? A = function(a, b) {
        return z.call(a, b)
    }: A = function(a, b) {
        return b in a && D(a.constructor.prototype[b], c)
    };
    var H = function(a, b) {} (['@font-face {font-family:"font";src:url("https://")}', ["@media (", o.join("touch-enabled),("), i, ")", "{#touch{top:9px;position:absolute}}"].join(""), ["@media (", o.join("transform-3d),("), i, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', m, '";visibility:hidden}'].join("")], ["fontface", "touch", "csstransforms3d", "generatedcontent"]);
    r.touch = function() {
        return "ontouchstart" in a
    },
    r.backgroundsize = function() {
        return G("backgroundSize")
    },
    r.backgroundsizecover = function() {
        return B("background-size: cover"),
        E(k.backgroundSize, "cover")
    };
    for (var I in r) A(r, I) && (v = I.toLowerCase(), e[v] = r[I](), u.push((e[v] ? "": "no-") + v));
    return e.addTest = function(a, b) {
        if (typeof a == "object") for (var d in a) A(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return;
            b = typeof b == "boolean" ? b: !!b(),
            g.className += " " + (b ? "": "no-") + a,
            e[a] = b
        }
        return e
    },
    B(""),
    j = l = null,
    a.attachEvent &&
    function() {
        var a = b.createElement("div");
        return a.innerHTML = "<elem></elem>",
        a.childNodes.length !== 1
    } () &&
    function(a, b) {
        function s(a) {
            var b = -1;
            while (++b < g) a.createElement(f[b])
        }
        a.iepp = a.iepp || {};
        var d = a.iepp,
        e = d.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        f = e.split("|"),
        g = f.length,
        h = new RegExp("(^|\\s)(" + e + ")", "gi"),
        i = new RegExp("<(/*)(" + e + ")", "gi"),
        j = /^\s*[\{\}]\s*$/,
        k = new RegExp("(^|[^\\n]*?\\s)(" + e + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
        l = b.createDocumentFragment(),
        m = b.documentElement,
        n = m.firstChild,
        o = b.createElement("body"),
        p = b.createElement("style"),
        q = /print|all/,
        r;
        d.getCSS = function(a, b) {
            if (a + "" === c) return "";
            var e = -1,
            f = a.length,
            g, h = [];
            while (++e < f) {
                g = a[e];
                if (g.disabled) continue;
                b = g.media || b,
                q.test(b) && h.push(d.getCSS(g.imports, b), g.cssText),
                b = "all"
            }
            return h.join("")
        },
        d.parseCSS = function(a) {
            var b = [],
            c;
            while ((c = k.exec(a)) != null) b.push(((j.exec(c[1]) ? "\n": c[1]) + c[2] + c[3]).replace(h, "$1.iepp_$2") + c[4]);
            return b.join("\n")
        },
        d.writeHTML = function() {
            var a = -1;
            r = r || b.body;
            while (++a < g) {
                var c = b.getElementsByTagName(f[a]),
                d = c.length,
                e = -1;
                while (++e < d) c[e].className.indexOf("iepp_") < 0 && (c[e].className += " iepp_" + f[a])
            }
            l.appendChild(r),
            m.appendChild(o),
            o.className = r.className,
            o.id = r.id,
            o.innerHTML = r.innerHTML.replace(i, "<$1font")
        },
        d._beforePrint = function() {
            p.styleSheet.cssText = d.parseCSS(d.getCSS(b.styleSheets, "all")),
            d.writeHTML()
        },
        d.restoreHTML = function() {
            o.innerHTML = "",
            m.removeChild(o),
            m.appendChild(r)
        },
        d._afterPrint = function() {
            d.restoreHTML(),
            p.styleSheet.cssText = ""
        },
        s(b),
        s(l);
        if (d.disablePP) return;
        n.insertBefore(p, n.firstChild),
        p.media = "print",
        p.className = "iepp-printshim",
        a.attachEvent("onbeforeprint", d._beforePrint),
        a.attachEvent("onafterprint", d._afterPrint)
    } (a, b),
    e._version = d,
    e._prefixes = o,
    e._domPrefixes = p,
    e.mq = x,
    e.hasEvent = y,
    e.testProp = function(a) {
        return F([a])
    },
    e.testAllProps = G,
    e.testStyles = w,
    e.prefixed = function(a) {
        return G(a, "pfx")
    },
    g.className = g.className.replace(/\bno-js\b/, "") + (f ? " js " + u.join(" ") : ""),
    e
} (this, this.document);

(function($) {
	$.fn.swipe = function(options) {
		
		// Default thresholds & swipe functions
		var defaults = {
			threshold: {
				x: 30,
				y: 10
			},
			swipeLeft: function() { alert('swiped left') },
			swipeRight: function() { alert('swiped right') }
		};
		
		var options = $.extend(defaults, options);
		
		if (!this) return false;
		
		return this.each(function() {
			
			var me = $(this)
			
			// Private variables for each element
			var originalCoord = { x: 0, y: 0 }
			var finalCoord = { x: 0, y: 0 }
			
			// Screen touched, store the original coordinate
			function touchStart(event) {
				//console.log('Starting swipe gesture...')
				originalCoord.x = event.targetTouches[0].pageX
				originalCoord.y = event.targetTouches[0].pageY
			}
			
			// Store coordinates as finger is swiping
			function touchMove(event) {
			    event.preventDefault();
				finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
				finalCoord.y = event.targetTouches[0].pageY
			}
			
			// Done Swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd(event) {
				//console.log('Ending swipe gesture...')
				var changeY = originalCoord.y - finalCoord.y
				if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
					changeX = originalCoord.x - finalCoord.x
					
					if(changeX > defaults.threshold.x) {
						defaults.swipeLeft()
					}
					if(changeX < (defaults.threshold.x*-1)) {
						defaults.swipeRight()
					}
				}
			}
			
			// Swipe was started
			function touchStart(event) {
				//console.log('Starting swipe gesture...')
				originalCoord.x = event.targetTouches[0].pageX
				originalCoord.y = event.targetTouches[0].pageY

				finalCoord.x = originalCoord.x
				finalCoord.y = originalCoord.y
			}
			
			// Swipe was canceled
			function touchCancel(event) { 
				//console.log('Canceling swipe gesture...')
			}
			
			// Add gestures to all swipable areas
			this.addEventListener("touchstart", touchStart, false);
			this.addEventListener("touchmove", touchMove, false);
			this.addEventListener("touchend", touchEnd, false);
			this.addEventListener("touchcancel", touchCancel, false);
				
		});
	};
})(jQuery);