const DEFAULT = {
  "size": [1000, 800],
  "ratio": 1,
  "ratioH": 1,
  "ratioV": 1,
  "spacing": 10,
  "spacingSmall": 5,
  "margin": 30,
  "borderColor": "#000",
  "lineColor": "#EEE",
  "fontColor": "#000",
  "backgroundColor": "#FFF",
  "dateTitle": {
    large: {
      size: 25,
      align: 'right',
      color: '#000',
    },
    small: {
      size: 17,
      align: 'right',
      color: '#000',
    }
  },
  "weekTitle": {
    size: 25,
    align: 'left',
    length: 0,
    has_border: false,
    backgroundColor: "#EEE",
    color: "#000",
    isUpper: false
  },
  "monthTitle": {
    size: 35,
    align: 'left',
    has_border: false,
    backgroundColor: "#EEE",
    color: "#000",
    isUpper: true
  },
  "yearInTitle": false,
  "yearTitle": {
    size: 12,
    align: 'left',
    color: '#000'
  },
  "lineWidth": 1,
  "note": {
    "is_background": false,
    "is_inside": false,
    "size": null, // [732, 244]
    "align": 'right',
    "has_line": true,
    "borderColor": "#FFF",
    "lineColor": "#EEE",
    "lineHeight": 20,
    "title": {
      "size": 15,
      "align": "left",
      "margin": 10,
      isUpper: false
    }
  }
}

const SIZE_FORMAT = {
  "letter": {
    "size": [792, 612],
    "ratio": {
      b: Math.sqrt(Math.pow(0.792, 2) + Math.pow(0.612, 2)),
      w: 0.792,
      h: 0.612
    },
  },
  '11x17': {
    "size": [1224, 792],
    "ratio": {
      b: Math.sqrt(Math.pow(1.224, 2) + Math.pow(0.792, 2)),
      w: 1.224,
      h: 0.792
    },
  },
  'legal': {
    "size": [1008, 612],
    "ratio": {
      b: Math.sqrt(Math.pow(1.008, 2) + Math.pow(0.612, 2)),
      w: 1.008,
      h: 0.612
    },
  },
  'poster': {
    "size": [792, 612],
    "ratio": {
      b: Math.sqrt(Math.pow(0.792, 2) + Math.pow(0.612, 2)),
      w: 0.792,
      h: 0.612
    },
  },
  'movie_poster': {
    "size": [1016, 686],
    "ratio": {
      b: Math.sqrt(Math.pow(1.016, 2) + Math.pow(0.686, 2)),
      w: 1.016,
      h: 0.686
    },
  },
  'a4': {
    "size": [841.89, 595.28],
    "ratio": {
      b: Math.sqrt(Math.pow(0.84189, 2) + Math.pow(0.59528, 2)),
      w: 0.84189,
      h: 0.59528
    },
  }
}

const ORIENTATION = {
  "m": {
    col: 1,
    total: 12,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 25,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 17,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 17,
        align: 'left',
        length: 3
      },
      "monthTitle": {
        size: 35,
        align: 'left'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true,
    }
  },
  "mv": {
    col: 1,
    total: 12,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 25,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 17,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 20,
        align: 'left',
        length: 3
      },
      "monthTitle": {
        size: 35,
        align: 'left'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true
    }
  },
  "1m": {
    col: 1,
    total: 1,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 25,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 17,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {size: 20, align: 'left', length: 3},
      "monthTitle": {size: 35, align: 'left'},
      "yearTitle": {size: 0, align: 'left'},
      "lineWidth": 1,
      "yearInTitle": true,
    }
  },
  "1mv": {
    col: 1,
    total: 1,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 25,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 17,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 20,
        align: 'left',
        length: 3
      },
      "monthTitle": {
        size: 35,
        align: 'left'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true,
    }
  },
  "2m": {
    col: 2,
    total: 2,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 20,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 18,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {size: 15, align: 'left'},
      "monthTitle": {size: 25, align: 'left'},
      "yearTitle": {size: 0, align: 'left'},
      "lineWidth": 1,
      "yearInTitle": true
    }
  },
  "2mv": {
    col: 1,
    total: 2,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 20,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 18,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 15,
        align: 'left'
      },
      "monthTitle": {
        size: 25,
        align: 'left'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true
    }
  },
  "3m": {
    col: 1,
    total: 3,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 16,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 14,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center'
      },
      "monthTitle": {
        size: 23,
        align: 'center'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true
    }
  },
  "3mv": {
    col: 1,
    total: 3,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 20,
          align: 'right',
          color: '#000',
        },
        small: {
          size: 18,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center'
      },
      "monthTitle": {
        size: 23,
        align: 'center'
      },
      "yearTitle": {
        size: 0,
        align: 'left'
      },
      "lineWidth": 1,
      "yearInTitle": true
    }
  },
  "4m": {
    col: 2,
    total: 4,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 18,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 15,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 20,
        align: 'center'
      },
      "yearTitle": {
        size: 26,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false
    }
  },
  "4mv": {
    col: 2,
    total: 4,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 18,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 15,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 20,
        align: 'center'
      },
      "yearTitle": {
        size: 26,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false
    }
  },
  "6m": {
    col: 2,
    total: 6,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 18,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 10,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 20,
        align: 'center'
      },
      "yearTitle": {
        size: 26,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false
    }
  },
  "6mv": {
    col: 2,
    total: 6,
    options: {
      "spacing": 10,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 17,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 10,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 14,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 20,
        align: 'center'
      },
      "yearTitle": {
        size: 26,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false
    }
  },
  "12m": {
    col: 4,
    total: 12,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 12,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 10,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 10,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 13,
        align: 'center'
      },
      "yearTitle": {
        size: 20,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false,
    }
  },
  "12mv": {
    col: 3,
    total: 12,
    options: {
      "spacing": 15,
      "margin": 30,
      "dateTitle": {
        large: {
          size: 14,
          align: 'center',
          color: '#000',
          spacing: 0
        },
        small: {
          size: 10,
          align: 'right',
          color: '#000',
        }
      },
      "weekTitle": {
        size: 10,
        align: 'center',
        length: 1
      },
      "monthTitle": {
        size: 13,
        align: 'center'
      },
      "yearTitle": {
        size: 20,
        align: 'center'
      },
      "lineWidth": 1,
      "yearInTitle": false
    }
  }
}

const STYLES = {
  default: {
    alias: "blank",
    title: "Blank"
  },
  "has-border": {
    alias: "has-border",
    title: "Has border",
    options: {
      "lineColor": "#EEE",
      "weekTitle": {
        has_border: true,
        align: 'center',
      },
      "monthTitle": {
        has_border: true,
        align: 'center',
      },
    }
  },
  "has-note": {
    title: "Has note",
    options: {
      "note": {
        "is_background": false,
        "is_inside": false,
        "size": [0.2, 1],
        "align": 'rb',
        "borderColor": "#FFF",
        "lineColor": "#EEE",
        "title": {
          "size": 17,
          "align": "left",
          "margin": 10
        }
      }
    }
  }
}

module.exports = {
  SIZE_FORMAT, DEFAULT, ORIENTATION, STYLES
}
