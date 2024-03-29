!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = e || self).TagCloud = t());
})(this, function () {
    "use strict";
    function i(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
    }
    function a() {
        return (a =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                }
                return e;
            }).apply(this, arguments);
    }
    function t(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e &&
                (i = i.filter(function (e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable;
                })),
                n.push.apply(n, i);
        }
        return n;
    }
    function s(o) {
        for (var e = 1; e < arguments.length; e++) {
            var a = null != arguments[e] ? arguments[e] : {};
            e % 2
                ? t(a, !0).forEach(function (e) {
                      var t, n, i;
                      (t = o), (i = a[(n = e)]), n in t ? Object.defineProperty(t, n, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[n] = i);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(a))
                : t(a).forEach(function (e) {
                      Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(a, e));
                  });
        }
        return o;
    }
    var o = (function () {
        function o() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : document.body,
                t = 1 < arguments.length ? arguments[1] : void 0,
                n = 2 < arguments.length ? arguments[2] : void 0;
            !(function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            })(this, o);
            var i = this;
            if (!e || 1 !== e.nodeType) return new Error("Incorrect element type");
            (i.$container = e),
                (i.texts = t || []),
                (i.config = s({}, o._defaultConfig, {}, n || {})),
                (i.radius = i.config.radius),
                (i.depth = 2 * i.radius),
                (i.size = 1.5 * i.radius),
                (i.maxSpeed = o._getMaxSpeed(i.config.maxSpeed)),
                (i.initSpeed = o._getInitSpeed(i.config.initSpeed)),
                (i.direction = i.config.direction),
                (i.keep = i.config.keep),
                i._createElment(),
                i._init(),
                o.list.push({ el: i.$el, container: e, instance: i });
        }
        return (
            (function (e, t, n) {
                t && i(e.prototype, t), n && i(e, n);
            })(
                o,
                [
                    {
                        key: "_createElment",
                        value: function () {
                            var i = this,
                                o = document.createElement("div");
                            (o.className = "tagcloud"),
                                (o.style.position = "relative"),
                                (o.style.width = "".concat(2 * i.radius, "px")),
                                (o.style.height = "".concat(2 * i.radius, "px")),
                                (i.items = []),
                                i.texts.forEach(function (e, t) {
                                    var n = i._createTextItem(e, t);
                                    o.appendChild(n.el), i.items.push(n);
                                }),
                                i.$container.appendChild(o),
                                (i.$el = o);
                        },
                    },
                    {
                        key: "_createTextItem",
                        value: function (e, t) {
                            var n = 1 < arguments.length && void 0 !== t ? t : 0,
                                i = document.createElement("span");
                            (i.className = "tagcloud--item"),
                                (i.style.position = "absolute"),
                                (i.style.top = "50%"),
                                (i.style.left = "50%"),
                                (i.style.zIndex = n + 1),
                                (i.style.filter = "alpha(opacity=0)"),
                                (i.style.opacity = 0),
                                (i.style.willChange = "transform, opacity, filter");
                            var o = "50% 50%";
                            (i.style.WebkitTransformOrigin = o), (i.style.MozTransformOrigin = o), (i.style.OTransformOrigin = o), (i.style.transformOrigin = o);
                            var a = "translateX(-50%) translateY(-50%) scale(1)";
                            (i.style.WebkitTransform = a), (i.style.MozTransform = a), (i.style.OTransform = a), (i.style.transform = a);
                            var r = "all .1s";
                            return (i.style.WebkitTransition = r), (i.style.MozTransition = r), (i.style.OTransition = r), (i.style.transition = r), (i.innerText = e), s({ el: i }, this._computePosition(n));
                        },
                    },
                    {
                        key: "_computePosition",
                        value: function (e, t) {
                            var n = 1 < arguments.length && void 0 !== t && t,
                                i = this.texts.length;
                            n && (e = Math.floor(Math.random() * (i + 1)));
                            var o = Math.acos((2 * e + 1) / i - 1),
                                a = Math.sqrt((i + 1) * Math.PI) * o;
                            return { x: (this.size * Math.cos(a) * Math.sin(o)) / 2, y: (this.size * Math.sin(a) * Math.sin(o)) / 2, z: (this.size * Math.cos(o)) / 2 };
                        },
                    },
                    {
                        key: "_init",
                        value: function () {
                            var n = this;
                            (n.active = !1),
                                (n.mouseX0 = n.initSpeed * Math.sin(n.direction * (Math.PI / 180))),
                                (n.mouseY0 = -n.initSpeed * Math.cos(n.direction * (Math.PI / 180))),
                                (n.mouseX = n.mouseX0),
                                (n.mouseY = n.mouseY0),
                                o._on(n.$el, "mouseover", function () {
                                    n.active = !0;
                                }),
                                o._on(n.$el, "mouseout", function () {
                                    n.active = !1;
                                }),
                                o._on(n.keep ? window : n.$el, "mousemove", function (e) {
                                    e = e || window.event;
                                    var t = n.$el.getBoundingClientRect();
                                    (n.mouseX = (e.clientX - (t.left + t.width / 2)) / 5), (n.mouseY = (e.clientY - (t.top + t.height / 2)) / 5);
                                }),
                                n._next(),
                                (n.interval = setInterval(function () {
                                    n._next.call(n);
                                }, 100));
                        },
                    },
                    {
                        key: "_next",
                        value: function () {
                            var m = this;
                            m.keep || m.active || ((m.mouseX = Math.abs(m.mouseX - m.mouseX0) < 1 ? m.mouseX0 : (m.mouseX + m.mouseX0) / 2), (m.mouseY = Math.abs(m.mouseY - m.mouseY0) < 1 ? m.mouseY0 : (m.mouseY + m.mouseY0) / 2));
                            var e = (-Math.min(Math.max(-m.mouseY, -m.size), m.size) / m.radius) * m.maxSpeed,
                                t = (Math.min(Math.max(-m.mouseX, -m.size), m.size) / m.radius) * m.maxSpeed;
                            if (!(Math.abs(e) <= 0.01 && Math.abs(t) <= 0.01)) {
                                var n = Math.PI / 180,
                                    d = [Math.sin(e * n), Math.cos(e * n), Math.sin(t * n), Math.cos(t * n)];
                                m.items.forEach(function (e) {
                                    var t = e.x,
                                        n = e.y * d[1] + e.z * -d[0],
                                        i = e.y * d[0] + e.z * d[1],
                                        o = t * d[3] + i * d[2],
                                        a = n,
                                        r = i * d[3] - t * d[2],
                                        s = (2 * m.depth) / (2 * m.depth + r);
                                    (e.x = o), (e.y = a), (e.z = r), (e.scale = s.toFixed(3));
                                    var l = s * s - 0.25;
                                    l = (1 < l ? 1 : l).toFixed(3);
                                    var c = e.el,
                                        u = (e.x - c.offsetWidth / 2).toFixed(2),
                                        f = (e.y - c.offsetHeight / 2).toFixed(2),
                                        h = "translateX(".concat(u, "px) translateY(").concat(f, "px) scale(").concat(e.scale, ")");
                                    (c.style.WebkitTransform = h), (c.style.MozTransform = h), (c.style.OTransform = h), (c.style.transform = h), (c.style.filter = "alpha(opacity=".concat(100 * l, ")")), (c.style.opacity = l);
                                });
                            }
                        },
                    },
                    {
                        key: "update",
                        value: function (e) {
                            var i = this;
                            (i.texts = e || []),
                                i.texts.forEach(function (e, t) {
                                    var n = i.items[t];
                                    n || (a((n = i._createTextItem(e, t)), i._computePosition(t, !0)), i.$el.appendChild(n.el), i.items.push(n)), (n.el.innerText = e);
                                });
                            var t = i.texts.length,
                                n = i.items.length;
                            t < n &&
                                i.items.splice(t, n - t).forEach(function (e) {
                                    i.$el.removeChild(e.el);
                                });
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            var t = this;
                            t.interval = null;
                            var e = o.list.findIndex(function (e) {
                                return e.el === t.$el;
                            });
                            -1 !== e && o.list.splice(e, 1), t.$container && t.$el && t.$container.removeChild(t.$el);
                        },
                    },
                ],
                [
                    {
                        key: "_on",
                        value: function (e, t, n, i) {
                            e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent ? e.attachEvent("on".concat(t), n) : (e["on".concat(t)] = n);
                        },
                    },
                ]
            ),
            o
        );
    })();
    (o.list = []),
        (o._defaultConfig = { radius: 100, maxSpeed: "normal", initSpeed: "normal", direction: 135, keep: !0 }),
        (o._getMaxSpeed = function (e) {
            return { slow: 5, normal: 10, fast: 20 }[e] || 10;
        }),
        (o._getInitSpeed = function (e) {
            return { slow: 20, normal: 40, fast: 80 }[e] || 50;
        });
    return function (e, t, n) {
        "string" == typeof e && (e = document.querySelectorAll(e)), e.forEach || (e = [e]);
        var i = [];
        return (
            e.forEach(function (e) {
                e && i.push(new o(e, t, n));
            }),
            i.length <= 1 ? i[0] : i
        );
    };
});



const myTags = [
    'JavaScript', 'CSS', 'HTML', 'PaaS','SaaS' , 'IaaS','Green-Blue Deployments', 'Scrum','REST','CKAD',
    'Canary Deployments','R&D', 'AI', 'Service Fabric.','UML','GIT','SVN','Bamboo','API Gateway',
    'Octopus','NUnit','Angualr', 'C#', 'Cloud', 'Event Driven' ,'Message Oriented', 'SOLID',
    'Typescript','MVC','WebAPI','ELK','Jupyter NoteBook', 'No SQL', 'SQL','XUnit','Hexagonal Design',
    'Spec Flow','Jasmine','PING','ForgeRock','Azure AD','PowerShell','Bash','Azure CLI','.Net Core',
    'Python', 'Go', 'Chrome', 'AWS', 'CI/CD','Azure Dev-OPS','AKS','TDD','BDD','IoT','Middle-Ware',
    'IIoT','Kibana','Log-Stash','Elastic Search','ASP.NET/ ASP.Net Core,','Entity Framework',
    'Spyder','Edge', 'Firefox', 'Safari','Docker','Terraform','Agile', 'XP Methodologies' ,
    'Kanban','Stoplight','UML','JQuery','SQL Server','LINQ','VS Unit Test','Anaconda','Azure Security',
    'Cost optimization','Microservices','Serverless Code Architecture','Cloud computing','Cloud Native Architecture',
    'OOD','Client-Server','Leadersip','Team management','Photography','Connected Homes',
];



var tagCloud = TagCloud('.sphere', myTags,{
  // radius in px
  radius: parseInt(window.innerHeight/2),
  // animation speed
  // slow, normal, fast
  maxSpeed: 'normal',
  initSpeed: 'slow',
  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,
  // interact with cursor move on mouse out
  keep: true
  
});