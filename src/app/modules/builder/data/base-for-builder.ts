export const base = [
  {
    "label": "动态构建",
    "id": "layout",
    "elements": [
      {
        "label": "默认",
        "icon": {
          "svg": "view-week-outline"
        },
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/home-shape.png",
              "classes": "object-fit",
              "alt": "home-shape.png"
            },
            "classes": "bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 6,
                "lg": 7
              },
              "direction": "col",
              "horizontal": "center",
              "vertical": "start",
              "gap": {
                "xs": "2",
                "sm": "2",
                "md": "2",
                "lg": "2"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none",
                "padding": "",
                "margin": ""
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 0,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面",
                  "style": "style-v4",
                  "classes": "mat-display-1 bold"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class=\"text-primary\">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。",
                  "bg": {
                    "classes": "bg- bg-fill-width"
                  },
                  "classes": ""
                },
                {
                  "type": "card-1v4",
                  "img": {
                    "classes": "object-fit",
                    "src": "/assets/images/avatar/01.jpeg"
                  },
                  "star": 5,
                  "title": "- Johnson",
                  "subTitle": "前端开发",
                  "body": "信使是一个灵活可扩展性高的前端Anuglar框架，动态组件可以使得组件之间变得更加灵活，但是依赖循环也变得复杂。"
                },
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 6,
                "lg": 5
              },
              "direction": "col",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "horizontal": "center",
              "vertical": "center",
              "elements": [
                {
                  "classes": "",
                  "alt": "alt",
                  "hostClasses": "text-center",
                  "animate": {
                    "from": {
                      "x": "100",
                      "y": 0,
                      "rotation": 0,
                      "scale": 0.8,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%",
                      "scrub": false
                    }
                  },
                  "type": "img",
                  "src": "/assets/images/illustration/11.png",
                  "style": {
                    "max-width": "60%"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "label": "两栏",
        "icon": {
          "svg": "image-text"
        },
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "",
              "classes": "object-fit",
              "alt": ""
            },
            "classes": "bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "stretch",
          "gap": {
            "xs": "5"
          },
          "wrapperClass": "sm:flex-nowrap",
          "animate": {
            "from": {
              "x": 0,
              "y": "100",
              "rotation": 0,
              "scale": 1,
              "opacity": 0,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": "10",
                "sm": "10",
                "md": "10",
                "lg": "10"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg- bg-fill-width"
              },
              "classes": "",
              "blockClasses": "bg-shadow ",
              "style": {
                "borderRadius": "none",
                "margin": ""
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "0",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "style": "none",
                  "classes": "mat-display-1 bold",
                  "typed": {
                    "enable": false,
                    "config": {
                      "typeSpeed": 120
                    },
                    "strings": [
                      {
                        "label": "web builder"
                      }
                    ]
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "title",
                  "label": "自由搭配，玩出新意"
                },
                {
                  "type": "link",
                  "label": "链接搭配你的风格",
                  "classes": "",
                  "href": "/"
                },
                {
                  "src": "/assets/images/products/huawei-watch-gt4-select-strap.webp",
                  "classes": "",
                  "alt": "alt",
                  "style": {
                    "width": "450px",
                    "height": "300px",
                    "opacity": "1",
                    "borderRadius": "0px",
                    "boxShadow": "none",
                    "aspectRatio": "1 / 1",
                    "objectFit": "contain"
                  },
                  "hostClasses": "text-center",
                  "animate": {
                    "from": {
                      "x": "0",
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 0,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%",
                      "scrub": true
                    }
                  },
                  "type": "img"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": "10",
                "sm": "10",
                "md": "10",
                "lg": "10"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg- bg-fill-width"
              },
              "classes": "",
              "blockClasses": "bg-shadow",
              "style": {
                "borderRadius": "none",
                "margin": ""
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "style": "none",
                  "classes": "mat-display-1 bold",
                  "typed": {
                    "enable": false,
                    "config": {
                      "typeSpeed": 120
                    },
                    "strings": [
                      {
                        "label": "web builder"
                      }
                    ]
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "title",
                  "label": "款款亮眼，爱不释手"
                },
                {
                  "type": "link",
                  "label": "探索更多",
                  "classes": "",
                  "href": "/"
                },
                {
                  "src": "/assets/images/products/huawei-watch-gt4-Huawei-wearables.webp",
                  "classes": "",
                  "alt": "alt",
                  "style": {
                    "width": "450px",
                    "height": "300px",
                    "opacity": "1",
                    "borderRadius": "0px",
                    "boxShadow": "none",
                    "aspectRatio": "1 / 1",
                    "objectFit": "contain"
                  },
                  "hostClasses": "text-center",
                  "animate": {
                    "from": {
                      "x": "0",
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 0,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%",
                      "scrub": true
                    }
                  },
                  "type": "img"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "三栏",
        "icon": {
          "svg": "view-week-outline"
        },
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/home-shape.png",
              "classes": "object-fit",
              "alt": "home-shape.png"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 4,
                "md": 4,
                "lg": 4
              },
              "direction": "row",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 0,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "box",
                  "img": {
                    "src": "/assets/images/svg/Asset187.svg",
                    "alt": "browser"
                  },
                  "style": "style-v3 use-image",
                  "title": {
                    "href": "#",
                    "label": "高性能"
                  },
                  "content": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 4,
                "md": 4,
                "lg": 4
              },
              "direction": "row",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 0,
                  "delay": "0.6",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "box",
                  "img": {
                    "src": "/assets/images/svg/Asset189.svg",
                    "alt": "browser"
                  },
                  "style": "style-v3 use-image primary",
                  "title": {
                    "href": "#",
                    "label": "易用的编辑器"
                  },
                  "content": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 4,
                "md": 4,
                "lg": 4
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "1",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "type": "box",
                  "img": {
                    "src": "/assets/images/svg/Asset190.svg",
                    "alt": "browser"
                  },
                  "style": "style-v3 use-image",
                  "title": {
                    "href": "#",
                    "label": "多语言"
                  },
                  "content": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； "
                }
              ]
            }
          ]
        }
      },
      {
        "label": "四栏",
        "icon": {
          "svg": "land-rows-vertical"
        },
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/home-shape.png",
              "classes": "object-fit",
              "alt": "home-shape.png"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "col",
              "horizontal": "end",
              "vertical": "end",
              "gap": {
                "xs": "10",
                "sm": "10",
                "md": "10",
                "lg": "10"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none",
                "padding": "",
                "margin": "",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "spacer": "none",
                  "body": "<p style=\"display: inline-block; margin-bottom: 0px;\">把想法转化给设计稿，根据设计稿通过拖拽出响应式页面，大大降低开发成本，将注意力放在您的业务。</p>",
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "text"
                },
                {
                  "src": "https://www2.bettyblocks.com/hubfs/RH-images/striped-arrow.svg",
                  "classes": "m-bottom-md",
                  "alt": "alt",
                  "style": {
                    "aspectRatio": "auto",
                    "objectFit": "initial"
                  },
                  "hostClasses": "text-center",
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "img"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "p-5",
              "style": {
                "borderRadius": "none",
                "padding": "20px",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "0.6",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "card-1v1",
                  "link": {
                    "href": "/node/463",
                    "label": "信使 UI 应用初始化及页面渲染流程"
                  },
                  "user": "表歌",
                  "time": "2022/09/27",
                  "feature": {
                    "fullIcon": "fullscreen",
                    "openIcon": "open_in_new",
                    "link": "#",
                    "ratios": "media-4-3",
                    "img": {
                      "classes": "object-fit",
                      "src": "/assets/images/hero/bg01.jpg",
                      "alt": "alt",
                      "style": {
                        "width": "auto",
                        "height": "auto",
                        "opacity": "1",
                        "borderRadius": 0,
                        "boxShadow": "none",
                        "aspectRatio": "auto",
                        "objectFit": "initial"
                      }
                    }
                  },
                  "moreLabel": "查看更多"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "p-5",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "1.2",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "card-1v1",
                  "link": {
                    "href": "/node/462",
                    "label": "信使Web builder 新增自定义组件流程"
                  },
                  "user": "表歌",
                  "time": "2022/09/27",
                  "feature": {
                    "fullIcon": "fullscreen",
                    "openIcon": "open_in_new",
                    "link": "#",
                    "ratios": "media-4-3",
                    "img": {
                      "classes": "object-fit",
                      "src": "/assets/images/hero/bg02.jpg",
                      "alt": "alt",
                      "style": {
                        "width": "auto",
                        "height": "auto",
                        "opacity": "1",
                        "borderRadius": 0,
                        "boxShadow": "none",
                        "aspectRatio": "auto",
                        "objectFit": "initial"
                      }
                    }
                  },
                  "moreLabel": "查看更多"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "p-5",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "1.2",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "card-1v1",
                  "link": {
                    "href": "/node/450",
                    "label": "作为前端开发，你应该知道的这十几个在线免费工具"
                  },
                  "user": "表歌",
                  "time": "2022/09/27",
                  "feature": {
                    "fullIcon": "fullscreen",
                    "openIcon": "open_in_new",
                    "link": "#",
                    "ratios": "media-4-3",
                    "img": {
                      "classes": "object-fit",
                      "src": "/assets/images/hero/bg05.jpg",
                      "alt": "alt",
                      "style": {
                        "width": "auto",
                        "height": "auto",
                        "opacity": "1",
                        "borderRadius": 0,
                        "boxShadow": "none",
                        "aspectRatio": "auto",
                        "objectFit": "initial"
                      }
                    }
                  },
                  "moreLabel": "查看更多"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "空白",
        "icon": {
          "svg": "border-none-variant"
        },
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "",
              "classes": "object-fit",
              "alt": ""
            },
            "classes": "bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "start",
              "vertical": "stretch",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "layoutAlign": "start start",
              "elements": []
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "start",
              "vertical": "stretch",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "layoutAlign": "start start",
              "elements": []
            }
          ]
        }
      },
      {
        "label": "自定义",
        "icon": {
          "svg": "code-json"
        },
        "content": {
          "type": "custom-template",
          "json": {
            "title": "web builder",
            "subTitle": "是一款通过拖拽组件构建页面的低代码",
            "img": "/assets/images/avatar/05.jpeg",
            "content": "信使UI是一款开源的前端框架，基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。"
          },
          "html": "<div class=\"text-center md:text-left md:flex bg-shadow rounded-xl p-8 md:p-0 m-5 mx-auto overflow-hidden\">\n          <img class=\"w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto\" src=\"{{img}}\" alt=\"\" width=\"384\" height=\"512\">\n          <div class=\"pt-6 md:p-8 text-center md:text-left space-y-4\">\n             <p class=\"text-lg font-medium\">\n                “{{content}}”\n              </p>\n            <div class=\"font-medium\">\n              <div class=\"text-primary text-xl\">\n                {{title}}\n              </div>\n              <div class=\"opacity-75\">\n                {{subTitle}}\n              </div>\n            </div>\n          </div>\n        </div>"
        }
      }
    ]
  },
  {
    "label": "常用 Section",
    "id": "section",
    "elements": [
      {
        "label": "1A",
        "content": {
          "fullWidth": false,
          "spacer": "xl",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/bg-02.png",
              "classes": "object-fit",
              "alt": "bg-02"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "horizontal": "start",
              "vertical": "stretch",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "style": "style-v4",
                  "classes": "mat-display-1 bold",
                  "typed": {
                    "enable": false,
                    "config": {
                      "typeSpeed": 120
                    },
                    "strings": [
                      {
                        "label": "web builder"
                      }
                    ]
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。"
                },
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "spacer",
                  "size": "sm"
                },
                {
                  "type": "img",
                  "hostClasses": "text-center",
                  "classes": "",
                  "src": "/assets/images/illustration/08.png",
                  "alt": "alt",
                  "style": {
                    "width": "auto",
                    "height": "auto",
                    "opacity": 1,
                    "borderRadius": 0,
                    "boxShadow": "none",
                    "aspectRatio": "2 / 1",
                    "objectFit": "contain"
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "1B",
        "content": {
          "fullWidth": false,
          "spacer": "xl",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/home-shape.png",
              "classes": "object-fit",
              "alt": "home-shape"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "wrapperClass": "md:flex-nowrap",
          "gap": {
            "xs": "5"
          },
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "spacer",
                  "size": "sm"
                },
                {
                  "type": "img",
                  "hostClasses": "text-center",
                  "classes": "",
                  "src": "/assets/images/illustration/08.png",
                  "alt": "alt",
                  "style": {
                    "width": "auto",
                    "height": "auto",
                    "opacity": 1,
                    "borderRadius": 0,
                    "boxShadow": "none",
                    "aspectRatio": "2 / 1",
                    "objectFit": "contain"
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "horizontal": "flex-start",
              "vertical": "flex-start",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "style": "style-v4",
                  "classes": "mat-display-1 bold",
                  "typed": {
                    "enable": false,
                    "config": {
                      "typeSpeed": 120
                    },
                    "strings": [
                      {
                        "label": "web builder"
                      }
                    ]
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。"
                },
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "2A",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/bg-01.png",
              "classes": "object-fit",
              "alt": "bg-01.png"
            },
            "classes": "bg-fill-width",
            "overlay": ""
          },
          "direction": "col",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": "10",
                "sm": "10",
                "md": "10",
                "lg": "20"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "img",
                  "hostClasses": "text-center",
                  "classes": "",
                  "src": "/assets/images/illustration/09.png",
                  "alt": "alt",
                  "style": {
                    "width": "auto",
                    "height": "auto",
                    "opacity": 1,
                    "borderRadius": 0,
                    "boxShadow": "none",
                    "objectFit": "initial"
                  }
                },
                {
                  "style": "style-v1",
                  "classes": "mat-display-1 bold",
                  "typed": {
                    "enable": false,
                    "config": {
                      "typeSpeed": 120
                    },
                    "strings": [
                      {
                        "label": "web builder"
                      }
                    ]
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "wrap": "wrap",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "style": {
                "borderRadius": "none"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "horizontal": "center",
              "vertical": "center",
              "elements": [
                {
                  "spacer": "none",
                  "classes": "md:max-w-3/4 mx-auto",
                  "body": "<p class=\"ql-align-center\">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>",
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "text"
                }
              ]
            },
            {
              "classes": "",
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 12,
                "lg": 12
              },
              "direction": "column",
              "elements": [
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "2B",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/bg-01.png",
              "classes": "object-fit",
              "alt": "bg-01.png"
            },
            "classes": "bg-fill-width",
            "overlay": ""
          },
          "direction": "col",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "classes": "",
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 12,
                "lg": 12
              },
              "direction": "column",
              "elements": [
                {
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面",
                  "style": "style-v1",
                  "classes": "mat-display-1 bold"
                }
              ]
            },
            {
              "classes": "",
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 12,
                "lg": 12
              },
              "direction": "column",
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "classes": "md:max-w-3/4 mx-auto",
                  "body": "<p class=\"ql-align-center\">信使UI是基于 Material 的 Angular 前端框架， 丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。基于Angular Material UI，支持SSR，多应用，后端可根据实际情况自由配置，可自定义开发、新增组件库。</p>"
                }
              ]
            },
            {
              "classes": "",
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 12,
                "lg": 12
              },
              "direction": "column",
              "elements": [
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            },
            {
              "classes": "",
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 12,
                "lg": 12
              },
              "direction": "column",
              "elements": [
                {
                  "src": "/assets/images/builder/builder-01.png",
                  "classes": "mt-5",
                  "hostClasses": "text-center",
                  "alt": "alt",
                  "style": {
                    "width": "85%",
                    "height": "auto",
                    "opacity": "0.9",
                    "borderRadius": "14px",
                    "boxShadow": "rgba(0, 0, 0, 0.1) 0px 4px 8px",
                    "aspectRatio": "auto",
                    "objectFit": "contain"
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": "300",
                      "rotation": 0,
                      "scale": "1",
                      "opacity": 0,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%",
                      "scrub": true
                    }
                  },
                  "type": "img"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "3A",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "",
              "classes": "object-fit",
              "alt": ""
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "wrapperClass": "md:flex-nowrap",
          "gap": {
            "xs": 0,
            "sm": 4
          },
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "wrap": "wrap",
              "horizontal": "start",
              "vertical": "stretch",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "mb-5",
              "blockClasses": "",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面",
                  "style": "style-v4",
                  "classes": "mat-display-1 bold"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。"
                },
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 6
              },
              "direction": "col",
              "wrap": "wrap",
              "horizontal": "start",
              "vertical": "start",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "overflow-hidden",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none"
              },
              "elements": [
                {
                  "params": {
                    "direction": "horizontal",
                    "breakpoints": {
                      "600": {
                        "slidesPerView": 3,
                        "spaceBetween": 20
                      },
                      "960": {
                        "slidesPerView": 3,
                        "spaceBetween": "20"
                      }
                    },
                    "effect": "slide",
                    "speed": 300,
                    "pagination": {
                      "paginationEnable": false
                    },
                    "navigation": false,
                    "centeredSlides": false,
                    "loop": false,
                    "autoplay": false,
                    "mousewheel": false
                  },
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "type": "swiper",
                  "classes": "",
                  "elements": [
                    {
                      "type": "card",
                      "title": "高性能",
                      "subTitle": "High Performance",
                      "classes": "card-no-shadow",
                      "body": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；",
                      "feature": {
                        "fullIcon": "fullscreen",
                        "openIcon": "open_in_new",
                        "link": "#",
                        "ratios": "media-4-3",
                        "img": {
                          "classes": "object-fit",
                          "src": "/assets/images/cases/porto1.jpg",
                          "alt": "alt"
                        }
                      }
                    },
                    {
                      "type": "card",
                      "feature": {
                        "fullIcon": "fullscreen",
                        "openIcon": "open_in_new",
                        "link": "#",
                        "ratios": "media-4-3",
                        "img": {
                          "classes": "object-fit",
                          "src": "/assets/images/cases/porto7.jpg",
                          "alt": "alt"
                        }
                      },
                      "title": "易用的编辑器",
                      "subTitle": "Simplicity for Editors",
                      "classes": "card-no-shadow",
                      "body": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                    },
                    {
                      "type": "card",
                      "feature": {
                        "fullIcon": "fullscreen",
                        "openIcon": "open_in_new",
                        "link": "#",
                        "ratios": "media-4-3",
                        "img": {
                          "classes": "object-fit",
                          "src": "/assets/images/cases/porto2.jpg",
                          "alt": "alt"
                        }
                      },
                      "title": "多语言",
                      "subTitle": "Leader in Multilingual",
                      "classes": "card-no-shadow",
                      "body": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；"
                    },
                    {
                      "type": "card",
                      "feature": {
                        "fullIcon": "fullscreen",
                        "openIcon": "open_in_new",
                        "link": "#",
                        "ratios": "media-4-3",
                        "img": {
                          "classes": "object-fit",
                          "src": "/assets/images/cases/porto3.jpg",
                          "alt": "alt"
                        }
                      },
                      "title": "更有弹性",
                      "subTitle": "Flexibility",
                      "classes": "card-no-shadow",
                      "body": "无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；"
                    },
                    {
                      "type": "card",
                      "feature": {
                        "fullIcon": "fullscreen",
                        "openIcon": "open_in_new",
                        "link": "#",
                        "ratios": "media-4-3",
                        "img": {
                          "classes": "object-fit",
                          "src": "/assets/images/cases/porto4.jpg",
                          "alt": "alt"
                        }
                      },
                      "title": "安全性",
                      "subTitle": "Rigorous Security",
                      "classes": "card-no-shadow",
                      "body": "为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "label": "3B",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/home-shape.png",
              "classes": "object-fit",
              "alt": "home-shape.png"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "wrapperClass": "md:flex-nowrap",
          "gap": {
            "xs": 0
          },
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "mb-5",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "title": {
                    "label": "免费",
                    "classes": ""
                  },
                  "type": "card-1v6",
                  "prefix": "¥",
                  "number": "0",
                  "suffix": "/月",
                  "body": "<ul class=\"list-done\"><li>获得免费访问平台的权限</li><li>浏览平台上公开的内容和资源</li><li>参与在线社区讨论和互动</li></ul>",
                  "actionsAlign": "start center",
                  "actions": [
                    {
                      "type": "btn",
                      "href": "/node/1",
                      "target": "_blank",
                      "label": "立即注册",
                      "mode": "raised",
                      "color": "primary"
                    }
                  ]
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "mb-5",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": "200",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "0.6",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%",
                  "scrub": true
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "title": {
                    "label": "初级会员",
                    "classes": "text-primary"
                  },
                  "type": "card-1v6",
                  "prefix": "¥",
                  "number": "99",
                  "suffix": "/月",
                  "classes": "bg-light",
                  "body": "<ul class=\"list-done\"><li>所有免费会员功能</li><li>享受高质量、独家的内容和教程</li><li>获得快速响应的客户支持服务</li><li>参与平台举办的活动和专属优惠</li></ul>",
                  "actionsAlign": "start center",
                  "actions": [
                    {
                      "type": "btn",
                      "href": "/node/1",
                      "target": "_blank",
                      "label": "立即购买",
                      "mode": "raised",
                      "color": "primary"
                    }
                  ]
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "mb-5",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "0.6",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "title": {
                    "label": "高级会员",
                    "classes": ""
                  },
                  "type": "card-1v6",
                  "prefix": "¥",
                  "number": "899",
                  "suffix": "/月",
                  "body": "<ul class=\"list-done\"><li>所有初级会员功能</li><li>获取深入的教程和指导</li><li>允许下载平台上的资源和素材</li><li>获得个性化的设计建议和反馈</li></ul>",
                  "actionsAlign": "start center",
                  "actions": [
                    {
                      "type": "btn",
                      "href": "/node/1",
                      "target": "_blank",
                      "label": "立即购买",
                      "mode": "raised",
                      "color": "primary"
                    }
                  ]
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 6,
                "md": 3,
                "lg": 3
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "stretch",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "mb-5",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": "100",
                  "rotation": 0,
                  "scale": 1,
                  "opacity": "0",
                  "delay": "1.2",
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "title": {
                    "label": "白金会员",
                    "classes": ""
                  },
                  "type": "card-1v6",
                  "prefix": "¥",
                  "number": "2889",
                  "suffix": "/月",
                  "body": "<ul class=\"list-done\"><li>所有高级会员功能</li><li>使用平台提供的高级设计工具和插件</li><li>参与专业会员专属的培训和活动</li><li>与专业设计师一对一的指导</li></ul>",
                  "actionsAlign": "start center",
                  "actions": [
                    {
                      "type": "btn",
                      "href": "/node/1",
                      "target": "_blank",
                      "label": "立即购买",
                      "mode": "raised",
                      "color": "primary"
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "label": "4A",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg- bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/bg-02.png",
              "classes": "object-fit",
              "alt": "bg-02"
            },
            "classes": "bg- bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 7
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "start",
              "vertical": "start",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "row": {
                    "xs": 12,
                    "sm": 12,
                    "md": 12,
                    "lg": 12
                  },
                  "direction": "row",
                  "wrap": "wrap",
                  "horizontal": "center",
                  "vertical": "center",
                  "gap": {
                    "xs": 0,
                    "sm": 0,
                    "md": 0,
                    "lg": 0
                  },
                  "bg": {
                    "img": {
                      "src": "",
                      "alt": "",
                      "classes": "object-fit"
                    },
                    "overlay": "",
                    "classes": "bg-fill-width"
                  },
                  "classes": "",
                  "blockClasses": "",
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "style": {
                    "borderRadius": "none",
                    "paddingTop": "0px",
                    "paddingRight": "0px",
                    "paddingBottom": "0px",
                    "paddingLeft": "0px",
                    "marginTop": "0px",
                    "marginRight": "0px",
                    "marginBottom": "0px",
                    "marginLeft": "0px"
                  },
                  "type": "layout-builder",
                  "spacer": "md",
                  "fullWidth": false,
                  "elements": [
                    {
                      "row": {
                        "xs": 12,
                        "sm": 6,
                        "md": 6,
                        "lg": 6
                      },
                      "direction": "col",
                      "wrap": "wrap",
                      "horizontal": "start",
                      "vertical": "stretch",
                      "gap": {
                        "xs": "5",
                        "sm": 5,
                        "md": 5,
                        "lg": 5
                      },
                      "bg": {
                        "img": {
                          "src": "",
                          "alt": "",
                          "classes": "object-fit"
                        },
                        "overlay": "",
                        "classes": "bg-fill-width"
                      },
                      "classes": "",
                      "blockClasses": "p-5",
                      "animate": {
                        "from": {
                          "x": 0,
                          "y": 0,
                          "rotation": 0,
                          "scale": 1,
                          "opacity": 1,
                          "delay": 0,
                          "duration": 1,
                          "ease": "none"
                        },
                        "trigger": {
                          "onEnter": "play",
                          "onLeave": "none",
                          "onEnterBack": "none",
                          "onLeaveBack": "none",
                          "start": "top 90%",
                          "end": "top 40%"
                        }
                      },
                      "style": {
                        "borderRadius": "none",
                        "paddingTop": "0px",
                        "paddingRight": "0px",
                        "paddingBottom": "0px",
                        "paddingLeft": "0px",
                        "marginTop": "0px",
                        "marginRight": "0px",
                        "marginBottom": "0px",
                        "marginLeft": "0px"
                      },
                      "elements": [
                        {
                          "type": "card-1v1",
                          "link": {
                            "href": "#",
                            "label": "信使WEB BUILDER 新增自定义组件流程"
                          },
                          "user": "表歌",
                          "time": "2022/09/27",
                          "feature": {
                            "fullIcon": "fullscreen",
                            "openIcon": "open_in_new",
                            "link": "#",
                            "ratios": "media-4-3",
                            "img": {
                              "classes": "object-fit",
                              "src": "/assets/images/hero/bg01.jpg",
                              "alt": "alt",
                              "style": {
                                "width": "auto",
                                "height": "auto",
                                "opacity": 1,
                                "borderRadius": 0,
                                "boxShadow": "none",
                                "objectFit": "initial"
                              }
                            },
                            "style": {
                              "width": "auto",
                              "height": "auto",
                              "opacity": 1,
                              "borderRadius": 0,
                              "boxShadow": "none",
                              "objectFit": "initial"
                            },
                            "src": "/assets/images/hero/bg01.jpg"
                          },
                          "moreLabel": "查看更多",
                          "style": {
                            "width": "auto",
                            "height": "auto",
                            "opacity": 1,
                            "borderRadius": 0,
                            "boxShadow": "none",
                            "objectFit": "initial"
                          },
                          "src": "/assets/images/hero/bg01.jpg",
                          "label": "<p>信使WEB BUILDER 新增自定义组件流程</p>"
                        },
                        {
                          "type": "card-1v1",
                          "link": {
                            "href": "#",
                            "label": "GITHUB 22 端口连接超时报错的解决办法"
                          },
                          "user": "表歌",
                          "time": "2022/09/27",
                          "feature": {
                            "fullIcon": "fullscreen",
                            "openIcon": "open_in_new",
                            "link": "#",
                            "ratios": "media-4-3",
                            "img": {
                              "classes": "object-fit",
                              "src": "/assets/images/showcase/5.jpg",
                              "alt": "alt",
                              "style": {
                                "width": "auto",
                                "height": "auto",
                                "opacity": "1",
                                "borderRadius": 0,
                                "boxShadow": "none",
                                "objectFit": "initial"
                              }
                            }
                          },
                          "moreLabel": "查看更多",
                          "style": {
                            "width": "auto",
                            "height": "auto",
                            "opacity": 1,
                            "borderRadius": 0,
                            "boxShadow": "none",
                            "objectFit": "initial"
                          },
                          "src": "/assets/images/hero/bg05.jpg"
                        }
                      ]
                    },
                    {
                      "row": {
                        "xs": 12,
                        "sm": 6,
                        "md": 6,
                        "lg": 6
                      },
                      "direction": "col",
                      "wrap": "wrap",
                      "horizontal": "start",
                      "vertical": "stretch",
                      "gap": {
                        "xs": 5,
                        "sm": 5,
                        "md": 5,
                        "lg": 11
                      },
                      "bg": {
                        "img": {
                          "src": "",
                          "alt": "",
                          "classes": "object-fit"
                        },
                        "overlay": "",
                        "classes": "bg-fill-width"
                      },
                      "classes": "",
                      "blockClasses": "p-5",
                      "animate": {
                        "from": {
                          "x": 0,
                          "y": 0,
                          "rotation": 0,
                          "scale": 1,
                          "opacity": 1,
                          "delay": 0,
                          "duration": 1,
                          "ease": "none"
                        },
                        "trigger": {
                          "onEnter": "play",
                          "onLeave": "none",
                          "onEnterBack": "none",
                          "onLeaveBack": "none",
                          "start": "top 90%",
                          "end": "top 40%"
                        }
                      },
                      "style": {
                        "borderRadius": "none",
                        "paddingTop": "0px",
                        "paddingRight": "0px",
                        "paddingBottom": "0px",
                        "paddingLeft": "0px",
                        "marginTop": "0px",
                        "marginRight": "0px",
                        "marginBottom": "0px",
                        "marginLeft": "0px"
                      },
                      "elements": [
                        {
                          "type": "card-1v1",
                          "link": {
                            "href": "#",
                            "label": "信使WEB BUILDER 新增历史版本"
                          },
                          "user": "表歌",
                          "time": "2022/09/27",
                          "feature": {
                            "fullIcon": "fullscreen",
                            "openIcon": "open_in_new",
                            "link": "#",
                            "ratios": "media-4-3",
                            "img": {
                              "classes": "object-fit",
                              "src": "/assets/images/hero/bg02.jpg",
                              "alt": "alt",
                              "style": {
                                "width": "auto",
                                "height": "auto",
                                "opacity": 1,
                                "borderRadius": 0,
                                "boxShadow": "none",
                                "objectFit": "initial"
                              }
                            }
                          },
                          "moreLabel": "查看更多",
                          "style": {
                            "width": "auto",
                            "height": "auto",
                            "opacity": 1,
                            "borderRadius": 0,
                            "boxShadow": "none",
                            "objectFit": "initial"
                          },
                          "src": "/assets/images/hero/bg02.jpg"
                        },
                        {
                          "type": "card-1v1",
                          "link": {
                            "href": "#",
                            "label": "信使 UI 应用初始化及页面渲染流程"
                          },
                          "user": "表歌",
                          "time": "2022/09/27",
                          "feature": {
                            "fullIcon": "fullscreen",
                            "openIcon": "open_in_new",
                            "link": "#",
                            "ratios": "media-4-3",
                            "img": {
                              "classes": "object-fit",
                              "src": "/assets/images/showcase/6.jpg",
                              "alt": "alt",
                              "style": {
                                "width": "auto",
                                "height": "auto",
                                "opacity": 1,
                                "borderRadius": 0,
                                "boxShadow": "none",
                                "objectFit": "initial"
                              }
                            }
                          },
                          "moreLabel": "查看更多",
                          "style": {
                            "width": "auto",
                            "height": "auto",
                            "opacity": 1,
                            "borderRadius": 0,
                            "boxShadow": "none",
                            "objectFit": "initial"
                          },
                          "src": "/assets/images/showcase/7.jpg"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 5
              },
              "direction": "col",
              "wrap": "wrap",
              "horizontal": "flex-start",
              "vertical": "flex-start",
              "gap": {
                "xs": "4",
                "sm": "4",
                "md": "4",
                "lg": "4"
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "p-5",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "elements": [
                {
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面",
                  "style": "style-v4",
                  "classes": "mat-display-1 bold"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。"
                },
                {
                  "type": "btn",
                  "href": "/node/1",
                  "target": "_blank",
                  "label": "了解更多",
                  "mode": "raised",
                  "color": "primary"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "5A",
        "content": {
          "fullWidth": false,
          "spacer": "md",
          "bgClasses": "bg-shadow bg-fill-width",
          "overlay": "",
          "classes": "",
          "id": "",
          "bg": {
            "img": {
              "src": "/assets/images/bg/bg-01.png",
              "classes": "object-fit",
              "alt": "bg-01"
            },
            "classes": "bg-shadow bg-fill-width",
            "overlay": ""
          },
          "direction": "row",
          "wrap": "wrap",
          "horizontal": "center",
          "vertical": "center",
          "animate": {
            "from": {
              "x": 0,
              "y": 0,
              "rotation": 0,
              "scale": 1,
              "opacity": 1,
              "delay": 0,
              "duration": 1,
              "ease": "none"
            },
            "trigger": {
              "onEnter": "play",
              "onLeave": "none",
              "onEnterBack": "none",
              "onLeaveBack": "none",
              "start": "top 90%",
              "end": "top 40%"
            }
          },
          "type": "layout-builder",
          "elements": [
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 8
              },
              "direction": "row",
              "wrap": "wrap",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "text-center",
              "blockClasses": "",
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "elements": [
                {
                  "type": "title",
                  "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建响应式页面",
                  "style": "style-v4",
                  "classes": "mat-display-1 bold"
                },
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "信使UI是基于 Material 的 Angular 前端框架，丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。"
                },
                {
                  "direction": "row",
                  "wrap": "wrap",
                  "horizontal": "center",
                  "vertical": "center",
                  "gap": {
                    "xs": "4",
                    "sm": "4",
                    "md": "4",
                    "lg": "4"
                  },
                  "wrapperClass": "sm:flex-nowrap",
                  "animate": {
                    "from": {
                      "x": 0,
                      "y": 0,
                      "rotation": 0,
                      "scale": 1,
                      "opacity": 1,
                      "delay": 0,
                      "duration": 1,
                      "ease": "none"
                    },
                    "trigger": {
                      "onEnter": "play",
                      "onLeave": "none",
                      "onEnterBack": "none",
                      "onLeaveBack": "none",
                      "start": "top 90%",
                      "end": "top 40%"
                    }
                  },
                  "row": {
                    "xs": 12,
                    "sm": 12,
                    "md": 12,
                    "lg": 12
                  },
                  "bg": {
                    "img": {
                      "src": "",
                      "alt": "",
                      "classes": "object-fit"
                    },
                    "overlay": "",
                    "classes": "bg-fill-width"
                  },
                  "classes": "",
                  "blockClasses": "",
                  "style": {
                    "borderRadius": "none",
                    "paddingTop": "0px",
                    "paddingRight": "0px",
                    "paddingBottom": "0px",
                    "paddingLeft": "0px",
                    "marginTop": "0px",
                    "marginRight": "0px",
                    "marginBottom": "0px",
                    "marginLeft": "0px"
                  },
                  "type": "layout-builder",
                  "spacer": "md",
                  "fullWidth": false,
                  "elements": [
                    {
                      "row": {
                        "xs": 12,
                        "sm": 4,
                        "md": 4,
                        "lg": 4
                      },
                      "direction": "column",
                      "horizontal": "flex-start",
                      "vertical": "flex-start",
                      "bg": {
                        "img": {
                          "src": "",
                          "classes": "object-fit",
                          "alt": ""
                        },
                        "overlay": "",
                        "classes": "bg-fill-width"
                      },
                      "classes": "",
                      "style": {
                        "paddingTop": "0px",
                        "paddingRight": "0px",
                        "paddingBottom": "0px",
                        "paddingLeft": "0px",
                        "marginTop": "0px",
                        "marginRight": "0px",
                        "marginBottom": "0px",
                        "marginLeft": "0px"
                      },
                      "animate": {
                        "from": {
                          "x": 0,
                          "y": 0,
                          "rotation": 0,
                          "scale": 1,
                          "delay": 0,
                          "duration": 1,
                          "ease": "none"
                        },
                        "trigger": {
                          "onEnter": "play",
                          "onLeave": "none",
                          "onEnterBack": "none",
                          "onLeaveBack": "none",
                          "start": "top 90%",
                          "end": "top 40%"
                        }
                      },
                      "elements": [
                        {
                          "type": "box",
                          "img": {
                            "src": "/assets/images/svg/Asset187.svg",
                            "alt": "browser"
                          },
                          "style": "style-v3 use-image",
                          "title": {
                            "href": "#",
                            "label": "高性能"
                          },
                          "content": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；"
                        }
                      ]
                    },
                    {
                      "row": {
                        "xs": 12,
                        "sm": 4,
                        "md": 4,
                        "lg": 4
                      },
                      "direction": "row",
                      "horizontal": "center",
                      "vertical": "center",
                      "bg": {
                        "img": {
                          "src": "",
                          "alt": "",
                          "classes": "object-fit"
                        },
                        "overlay": "",
                        "classes": "bg-fill-width"
                      },
                      "classes": "",
                      "blockClasses": "",
                      "style": {
                        "borderRadius": "none",
                        "paddingTop": "0px",
                        "paddingRight": "0px",
                        "paddingBottom": "0px",
                        "paddingLeft": "0px",
                        "marginTop": "0px",
                        "marginRight": "0px",
                        "marginBottom": "0px",
                        "marginLeft": "0px"
                      },
                      "animate": {
                        "from": {
                          "x": 0,
                          "y": 0,
                          "rotation": 0,
                          "scale": 1,
                          "opacity": 1,
                          "delay": 0,
                          "duration": 1,
                          "ease": "none"
                        },
                        "trigger": {
                          "onEnter": "play",
                          "onLeave": "none",
                          "onEnterBack": "none",
                          "onLeaveBack": "none",
                          "start": "top 90%",
                          "end": "top 40%"
                        }
                      },
                      "wrap": "wrap",
                      "elements": [
                        {
                          "type": "box",
                          "img": {
                            "src": "/assets/images/svg/Asset187.svg",
                            "alt": "browser"
                          },
                          "style": "style-v3 use-image",
                          "title": {
                            "href": "#",
                            "label": "易用的编辑器"
                          },
                          "content": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                        }
                      ]
                    },
                    {
                      "row": {
                        "xs": 12,
                        "sm": 4,
                        "md": 4,
                        "lg": 4
                      },
                      "direction": "column",
                      "horizontal": "center",
                      "vertical": "center",
                      "bg": {
                        "img": {
                          "src": "",
                          "classes": "object-fit",
                          "alt": ""
                        },
                        "overlay": "",
                        "classes": "bg-fill-width"
                      },
                      "classes": "",
                      "style": {
                        "paddingTop": "0px",
                        "paddingRight": "0px",
                        "paddingBottom": "0px",
                        "paddingLeft": "0px",
                        "marginTop": "0px",
                        "marginRight": "0px",
                        "marginBottom": "0px",
                        "marginLeft": "0px"
                      },
                      "animate": {
                        "from": {
                          "x": 0,
                          "y": 0,
                          "rotation": 0,
                          "scale": 1,
                          "delay": 0,
                          "duration": 1,
                          "ease": "none"
                        },
                        "trigger": {
                          "onEnter": "play",
                          "onLeave": "none",
                          "onEnterBack": "none",
                          "onLeaveBack": "none",
                          "start": "top 90%",
                          "end": "top 40%"
                        }
                      },
                      "elements": [
                        {
                          "type": "box",
                          "img": {
                            "src": "/assets/images/svg/Asset187.svg",
                            "alt": "browser"
                          },
                          "style": "style-v3 use-image",
                          "title": {
                            "href": "#",
                            "label": "多语言"
                          },
                          "content": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程； "
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "row": {
                "xs": 12,
                "sm": 12,
                "md": 6,
                "lg": 4
              },
              "direction": "row",
              "horizontal": "center",
              "vertical": "center",
              "gap": {
                "xs": 0,
                "sm": 0,
                "md": 0,
                "lg": 0
              },
              "bg": {
                "img": {
                  "src": "",
                  "alt": "",
                  "classes": "object-fit"
                },
                "overlay": "",
                "classes": "bg-fill-width"
              },
              "classes": "",
              "blockClasses": "",
              "style": {
                "borderRadius": "none",
                "paddingTop": "0px",
                "paddingRight": "0px",
                "paddingBottom": "0px",
                "paddingLeft": "0px",
                "marginTop": "0px",
                "marginRight": "0px",
                "marginBottom": "0px",
                "marginLeft": "0px"
              },
              "animate": {
                "from": {
                  "x": 0,
                  "y": 0,
                  "rotation": 0,
                  "scale": 1,
                  "opacity": 1,
                  "delay": 0,
                  "duration": 1,
                  "ease": "none"
                },
                "trigger": {
                  "onEnter": "play",
                  "onLeave": "none",
                  "onEnterBack": "none",
                  "onLeaveBack": "none",
                  "start": "top 90%",
                  "end": "top 40%"
                }
              },
              "wrap": "wrap",
              "elements": [
                {
                  "type": "img",
                  "hostClasses": "text-center",
                  "classes": "",
                  "src": "/assets/images/illustration/11.png",
                  "alt": "alt",
                  "style": {
                    "width": "85%",
                    "height": "auto",
                    "opacity": "1",
                    "borderRadius": "0px",
                    "boxShadow": "none",
                    "aspectRatio": "2 / 3",
                    "objectFit": "contain"
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    "label": "常用组件",
    "id": "base",
    "elements": [
      {
        "label": "富文本",
        "id": "text",
        "icon": {
          "svg": "format-size"
        },
        "content": {
          "type": "text",
          "title": {
            "label": "欢迎使用 <strong class=\"text-primary\">Web Builder</strong> 快速构建页面",
            "style": "style-v1",
            "classes": "mat-display-1 bold"
          },
          "bg": {
            "classes": "bg- bg-fill-width"
          },
          "body": "信使UI是基于 Material 的 Angular 前端框架， 五十多个丰富的组件可提供优秀的数字创新体验，使用 Web Builder 可以通过拖拽快速构建响应式、多主题的 Web 页面。Builder 与众不同的是它完全融入到了 <strong class=\"text-primary\">Storybook</strong> 当中，它是一个面向UI组件开发的工具，提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。",
          "classes": "text-center",
          "actionsAlign": "center center",
          "actions": [
            {
              "type": "btn-generater",
              "label": "生成页面",
              "color": "primary",
              "mode": "raised"
            },
            {
              "type": "btn",
              "color": "primary",
              "mode": "stroked",
              "label": "演示视频",
              "href": "https://www.bilibili.com/video/BV1ux4y197kc/?spm_id_from=333.999.0.0&vd_source=f65b4e2d70ecc450290b6b1710c0ada5",
              "target": "_blank",
              "icon": {
                "inline": true,
                "svg": "play-circle-outline"
              }
            }
          ]
        }
      },
      {
        "label": "图文",
        "icon": {
          "svg": "image-text"
        },
        "content": {
          "type": "text-hero",
          "theme": "text-light",
          "params": {
            "height": "750px"
          },
          "text": {
            "title": {
              "label": "为所有开发者、所有应用场景而设计",
              "style": "style-v4",
              "classes": "mat-display-2 bold"
            },
            "classes": "y-center",
            "style": [],
            "bg": {
              "classes": "",
              "img": {
                "src": "/assets/images/16-9/nature-08.jpg",
                "hostClasses": ""
              }
            },
            "body": "<p>Storybook是一个面向UI组件开发的工具，它提供了组件驱动的开发方式、交互式展示和测试界面，以及文档化功能。它的目标是提高开发效率、组件质量和团队协作，是一个广泛应用于前端开发的工具。</p>",
            "actionsAlign": "start center",
            "actions": [
              {
                "type": "btn",
                "mode": "raised",
                "color": "primary",
                "href": "",
                "label": "了解更多"
              }
            ]
          }
        }
      },
      {
        "label": "间距",
        "icon": {
          "svg": "border-horizontal"
        },
        "content": {
          "type": "spacer",
          "size": "sm"
        }
      },
      {
        "label": "选项卡",
        "icon": {
          "svg": "tab"
        },
        "content": {
          "type": "tab",
          "classes": "bg-light",
          "align": "center",
          "pills": true,
          "fullWidth": false,
          "elements": [
            {
              "label": "简便快捷",
              "elements": [
                {
                  "id": "",
                  "type": "showcase-3v9",
                  "spacer": "xl",
                  "bg": {
                    "classes": "bg-fill-width",
                    "img": {
                      "src": "/assets/images/bg/bg-01.png"
                    }
                  },
                  "order": {
                    "left": 0,
                    "right": 1
                  },
                  "left": [
                    {
                      "type": "img",
                      "src": "/assets/images/illustration/25.png",
                      "alt": ""
                    }
                  ],
                  "right": [
                    {
                      "type": "text",
                      "spacer": "sm",
                      "title": {
                        "label": "构建你们的项目",
                        "style": "style-v4",
                        "classes": "mat-display-2"
                      },
                      "body": "允许用户通过拖放元素、调整布局和编辑内容来设计页面，而无需编写复杂的代码。这使得即使没有专业的编程知识，用户也能够创建出具有吸引力和功能性的网页"
                    },
                    {
                      "type": "swiper",
                      "params": {
                        "slidesPerView": 1,
                        "spaceBetween": 20,
                        "navigation": false,
                        "observer": true,
                        "observeParents": true
                      },
                      "classes": "p-bottom",
                      "elements": [
                        {
                          "type": "card",
                          "title": "高性能",
                          "subTitle": "High Performance",
                          "avatar": {
                            "src": "/assets/images/avatar/01.jpeg",
                            "alt": ""
                          },
                          "classes": "card-no-shadow",
                          "body": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/02.jpeg",
                            "alt": ""
                          },
                          "title": "易用的编辑器",
                          "subTitle": "Simplicity for Editors",
                          "classes": "card-no-shadow",
                          "body": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/03.jpeg",
                            "alt": ""
                          },
                          "title": "多语言",
                          "subTitle": "Leader in Multilingual",
                          "classes": "card-no-shadow",
                          "body": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/04.jpeg",
                            "alt": ""
                          },
                          "title": "更有弹性",
                          "subTitle": "Flexibility",
                          "classes": "card-no-shadow",
                          "body": "无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/05.jpeg",
                            "alt": ""
                          },
                          "title": "安全性",
                          "subTitle": "Rigorous Security",
                          "classes": "card-no-shadow",
                          "body": "为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "label": "无需专业",
              "elements": [
                {
                  "id": "",
                  "type": "showcase-3v9",
                  "spacer": "xl",
                  "order": {
                    "left": 1,
                    "right": 0
                  },
                  "left": [
                    {
                      "type": "img",
                      "src": "/assets/images/illustration/25.png",
                      "alt": ""
                    }
                  ],
                  "right": [
                    {
                      "type": "text",
                      "spacer": "sm",
                      "title": {
                        "label": "创意设计和干净整洁的代码",
                        "style": "style-v4",
                        "classes": "mat-display-2"
                      },
                      "body": "页面构建器的设计初衷是让非技术人员也能够轻松创建网页。通过使用页面构建器，任何人都可以成为网页设计师。"
                    },
                    {
                      "type": "swiper",
                      "params": {
                        "slidesPerView": 1,
                        "spaceBetween": 20,
                        "navigation": false,
                        "observer": true,
                        "observeParents": true
                      },
                      "classes": "p-bottom",
                      "elements": [
                        {
                          "type": "card",
                          "title": "高性能",
                          "subTitle": "High Performance",
                          "avatar": {
                            "src": "/assets/images/avatar/01.jpeg",
                            "alt": ""
                          },
                          "classes": "card-no-shadow",
                          "body": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/02.jpeg",
                            "alt": ""
                          },
                          "title": "易用的编辑器",
                          "subTitle": "Simplicity for Editors",
                          "classes": "card-no-shadow",
                          "body": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/03.jpeg",
                            "alt": ""
                          },
                          "title": "多语言",
                          "subTitle": "Leader in Multilingual",
                          "classes": "card-no-shadow",
                          "body": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/04.jpeg",
                            "alt": ""
                          },
                          "title": "更有弹性",
                          "subTitle": "Flexibility",
                          "classes": "card-no-shadow",
                          "body": "无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/05.jpeg",
                            "alt": ""
                          },
                          "title": "安全性",
                          "subTitle": "Rigorous Security",
                          "classes": "card-no-shadow",
                          "body": "为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "label": "成本效益",
              "elements": [
                {
                  "id": "",
                  "type": "showcase-3v9",
                  "spacer": "xl",
                  "order": {
                    "left": 0,
                    "right": 1
                  },
                  "left": [
                    {
                      "type": "img",
                      "src": "/assets/images/illustration/29.png",
                      "alt": ""
                    }
                  ],
                  "right": [
                    {
                      "type": "text",
                      "spacer": "sm",
                      "title": {
                        "label": "应用24小时支持和响应",
                        "style": "style-v4",
                        "classes": "mat-display-2"
                      },
                      "body": "相对于传统的自定义网页开发，使用页面构建器可以节省大量的时间和成本。它们提供了一系列预先设计好的模块和功能，用户只需根据自己的需求进行选择和调整即可。"
                    },
                    {
                      "type": "swiper",
                      "params": {
                        "slidesPerView": 1,
                        "spaceBetween": 20,
                        "navigation": false,
                        "observer": true,
                        "observeParents": true
                      },
                      "classes": "p-bottom",
                      "elements": [
                        {
                          "type": "card",
                          "title": "高性能",
                          "subTitle": "High Performance",
                          "avatar": {
                            "src": "/assets/images/avatar/01.jpeg",
                            "alt": ""
                          },
                          "classes": "card-no-shadow",
                          "body": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/02.jpeg",
                            "alt": ""
                          },
                          "title": "易用的编辑器",
                          "subTitle": "Simplicity for Editors",
                          "classes": "card-no-shadow",
                          "body": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/03.jpeg",
                            "alt": ""
                          },
                          "title": "多语言",
                          "subTitle": "Leader in Multilingual",
                          "classes": "card-no-shadow",
                          "body": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/04.jpeg",
                            "alt": ""
                          },
                          "title": "更有弹性",
                          "subTitle": "Flexibility",
                          "classes": "card-no-shadow",
                          "body": "无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；"
                        },
                        {
                          "type": "card",
                          "avatar": {
                            "src": "/assets/images/avatar/05.jpeg",
                            "alt": ""
                          },
                          "title": "安全性",
                          "subTitle": "Rigorous Security",
                          "classes": "card-no-shadow",
                          "body": "为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "label": "幻灯片",
        "icon": {
          "svg": "view-array-outline"
        },
        "content": {
          "type": "swiper",
          "params": {
            "navigation": false,
            "breakpoints": {
              "600": {
                "slidesPerView": 3,
                "spaceBetween": 20
              },
              "960": {
                "slidesPerView": 3,
                "spaceBetween": 50
              }
            }
          },
          "classes": "",
          "elements": [
            {
              "type": "card",
              "title": "高性能",
              "subTitle": "High Performance",
              "classes": "card-no-shadow",
              "body": "默认情况下，Drupal 运行速度很快，您可以优化部署，使其运行得更快；",
              "feature": {
                "fullIcon": "fullscreen",
                "openIcon": "open_in_new",
                "link": "#",
                "ratios": "media-4-3",
                "img": {
                  "classes": "object-fit",
                  "src": "/assets/images/cases/porto1.jpg",
                  "alt": "alt"
                }
              }
            },
            {
              "type": "card",
              "feature": {
                "fullIcon": "fullscreen",
                "openIcon": "open_in_new",
                "link": "#",
                "ratios": "media-4-3",
                "img": {
                  "classes": "object-fit",
                  "src": "/assets/images/cases/porto7.jpg",
                  "alt": "alt"
                }
              },
              "title": "易用的编辑器",
              "subTitle": "Simplicity for Editors",
              "classes": "card-no-shadow",
              "body": "通过友好的预览、拖放媒体提高内容编辑的易用性，高效的工作；"
            },
            {
              "type": "card",
              "feature": {
                "fullIcon": "fullscreen",
                "openIcon": "open_in_new",
                "link": "#",
                "ratios": "media-4-3",
                "img": {
                  "classes": "object-fit",
                  "src": "/assets/images/cases/porto2.jpg",
                  "alt": "alt"
                }
              },
              "title": "多语言",
              "subTitle": "Leader in Multilingual",
              "classes": "card-no-shadow",
              "body": "Drupal 100多种语言提供了无以伦比的支持和翻译工作流程；"
            },
            {
              "type": "card",
              "feature": {
                "fullIcon": "fullscreen",
                "openIcon": "open_in_new",
                "link": "#",
                "ratios": "media-4-3",
                "img": {
                  "classes": "object-fit",
                  "src": "/assets/images/cases/porto3.jpg",
                  "alt": "alt"
                }
              },
              "title": "更有弹性",
              "subTitle": "Flexibility",
              "classes": "card-no-shadow",
              "body": "无论是一个还是多个站点，Drupal 总是可以游刃有余的构建；"
            },
            {
              "type": "card",
              "feature": {
                "fullIcon": "fullscreen",
                "openIcon": "open_in_new",
                "link": "#",
                "ratios": "media-4-3",
                "img": {
                  "classes": "object-fit",
                  "src": "/assets/images/cases/porto4.jpg",
                  "alt": "alt"
                }
              },
              "title": "安全性",
              "subTitle": "Rigorous Security",
              "classes": "card-no-shadow",
              "body": "为了抵御安全漏洞，将有一组团队解决并发布安全修补程序，超过45000名贡献者使该平台成为市场上最安全、最稳定的平台之一；"
            }
          ]
        }
      },
      {
        "label": "搜索框",
        "icon": {
          "svg": "magnify"
        },
        "content": {
          "id": "xxx",
          "type": "action-1v1",
          "spacer": "xl",
          "bg": {
            "classes": "bg-shadow bg-fill-width"
          },
          "classes": "",
          "text": {
            "title": {
              "label": "如何才能帮助到您？",
              "style": "none",
              "classes": "mat-display-1"
            },
            "classes": "",
            "spacer": "none",
            "body": "<p>这里有你想要的答案，请根据以下筛选条件选择进行搜索。</p>",
            "actions": [
              {
                "type": "search-action",
                "button": {
                  "label": "搜索",
                  "color": "primary"
                },
                "form": [
                  {
                    "type": "select",
                    "key": "skill",
                    "label": "技能",
                    "options": [
                      {
                        "label": "无",
                        "value": ""
                      },
                      {
                        "label": "Angular",
                        "value": "angular"
                      },
                      {
                        "label": "React",
                        "value": "react"
                      },
                      {
                        "label": "Vue",
                        "value": "vue"
                      }
                    ]
                  },
                  {
                    "type": "select",
                    "key": "cms",
                    "label": "CMS",
                    "options": [
                      {
                        "label": "无",
                        "value": ""
                      },
                      {
                        "label": "Drupal",
                        "value": "drupal"
                      },
                      {
                        "label": "WP",
                        "value": "wp"
                      },
                      {
                        "label": "Joomla",
                        "value": "joomla"
                      }
                    ]
                  },
                  {
                    "type": "input",
                    "key": "keys",
                    "placeholder": "请输入关键词搜索",
                    "controlType": "search",
                    "label": "关键词",
                    "appearance": "legacy"
                  }
                ]
              }
            ]
          },
          "shape": true
        }
      },
      {
        "label": "折叠面板",
        "icon": {
          "svg": "format-line-weight"
        },
        "content": {
          "type": "panel",
          "elements": [
            {
              "title": "组件驱动开发",
              "icon": "person",
              "params": {
                "expanded": true
              },
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "Storybook采用了组件驱动开发的方法，即将UI组件作为开发的核心单元。开发人员可以在Storybook中为每个UI组件创建\"stories\"，描述组件在不同状态和交互方式下的行为和外观。这种方法能够提高组件的可重用性和可测试性。"
                }
              ]
            },
            {
              "title": "组件展示和测试",
              "icon": "faviores",
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "Storybook提供了一个交互式的界面，用于展示和测试UI组件。开发人员可以在浏览器中浏览和交互组件，以便检查其外观和行为，并确保它们在各种条件下正常工作。这有助于加快开发迭代周期，提高组件的质量。"
                }
              ]
            },
            {
              "title": "文档化",
              "icon": "faviores",
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "Storybook不仅可以展示和测试组件，还可以自动生成组件的文档。开发人员可以使用Markdown或其他文档格式编写组件文档，并将其与组件关联。这使得团队成员可以更好地理解和使用组件，减少了沟通成本。"
                }
              ]
            },
            {
              "title": "插件和工具生态系统",
              "icon": "faviores",
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "body": "Storybook拥有丰富的插件和工具生态系统，可以扩展其功能。这些插件可以用于模拟数据、测试组件的不同状态和交互，并生成自动化测试报告。这样，开发人员可以根据自己的需求定制和扩展Storybook。"
                }
              ]
            }
          ]
        }
      },
      {
        "label": "背景视频",
        "icon": {
          "svg": "movie-outline"
        },
        "content": {
          "type": "video-bg",
          "source": {
            "src": "/assets/video/storybook.mp4",
            "type": "video/mp4"
          },
          "bg": {
            "classes": "bg-fill-width overlay overlay-80"
          },
          "classes": "",
          "elements": [
            {
              "type": "showcase-1v3",
              "title": {
                "label": "Storybook 是什么？",
                "style": "style-v1",
                "classes": "mat-display-1"
              },
              "classes": "text-light",
              "elements": [
                {
                  "type": "text",
                  "spacer": "none",
                  "style": {
                    "margin": "0 auto",
                    "text-align": "center",
                    "width": "600px"
                  },
                  "body": "Storybook是一个用于开发和展示UI组件的工具。它提供了一个独立的环境，开发人员可以在其中构建、测试和文档化单个UI组件，而无需依赖于整个应用程序的上下文，Storybook是一个用于开发和展示UI组件的工具。",
                  "actionsAlign": "center center",
                  "actions": [
                    {
                      "label": "了解更多",
                      "type": "btn",
                      "href": "#",
                      "mode": "raised",
                      "color": "primary"
                    },
                    {
                      "label": "回到官网",
                      "type": "btn",
                      "href": "#",
                      "icon": {
                        "inline": true,
                        "svg": "home"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        "label": "联系我们",
        "icon": {
          "svg": "account-box-outline"
        },
        "content": {
          "type": "contact-us",
          "params": {
            "webform_id": "contact"
          },
          "bg": {
            "classes": "bg-fill-width",
            "icon": "wave"
          },
          "action": {
            "label": "提交"
          },
          "formOrder": "1",
          "contact": [
            {
              "title": {
                "label": "地址"
              },
              "icon": {
                "name": "location_on"
              },
              "style": "style-v7 small-box",
              "content": "创客城2栋"
            },
            {
              "title": {
                "label": "电话号码"
              },
              "style": "style-v7 small-box",
              "icon": {
                "name": "phone"
              },
              "content": "+086 0771xxxx"
            },
            {
              "title": {
                "label": "邮件"
              },
              "style": "style-v7 small-box",
              "icon": {
                "name": "mail"
              },
              "content": "service@example.com"
            },
            {
              "title": {
                "label": "微信"
              },
              "style": "style-v7 small-box",
              "icon": {
                "name": "chat_bubble"
              },
              "content": "biaogebusy"
            }
          ],
          "forms": [
            {
              "type": "input",
              "label": "姓名",
              "key": "name",
              "params": {
                "required": true
              }
            },
            {
              "type": "input",
              "label": "邮箱",
              "key": "email",
              "params": {
                "required": true
              }
            },
            {
              "type": "input",
              "label": "主题",
              "key": "subject",
              "params": {
                "required": true
              }
            },
            {
              "type": "textarea",
              "label": "内容",
              "params": {
                "required": true,
                "matAutosizeMinRows": 5
              },
              "key": "message",
              "placeholder": "Message"
            }
          ]
        }
      }
    ]
  }
]
