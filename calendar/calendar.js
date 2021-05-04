const _ = require('lodash');
const PDFDocument = require('pdfkit');
const {createPage} = require('./helpers');
const moment = require('moment');

const {DEFAULT, SIZE_FORMAT, ORIENTATION, STYLES} = require("./template");
const holidays = {}

module.exports = class PDFCalendar {
  constructor({type, year, day_size, orientation, paper_size, weekend_shaded, grid_lines, grid_color, weekday_start, month_start, style}) {
    this.calendar_type = type ? type : '1m'
    if (!year) {
      year = (new Date()).getFullYear()
    } else {
      year = Number.parseInt(year)
    }
    paper_size = paper_size || 'letter'
    if (grid_lines === 'false') {
      grid_color = 'FFF'
    }
    this.options = _.merge({}, DEFAULT,
      SIZE_FORMAT[paper_size],
      ORIENTATION[this.calendar_type].options,
      {
        weekend_shaded: weekend_shaded === 'true',
        day_size,
        lineColor: grid_color ? `#${grid_color}` : "#FFF"
      },
      style ? STYLES[style].options : {},
      style ? STYLES[style][`${type}_options`] : {}
    )
    this.options.dateTitle.size = this.options.ratio.b * this.options.dateTitle.size
    this.options.weekTitle.size = this.options.ratio.b * this.options.weekTitle.size
    this.options.monthTitle.size = this.options.ratio.b * this.options.monthTitle.size
    this.options.yearTitle.size = this.options.ratio.b * this.options.yearTitle.size
    this.options.size = [SIZE_FORMAT[paper_size].size[0], SIZE_FORMAT[paper_size].size[1]]
    this.options.dateTitle = this.options.dateTitle[day_size || "small"]
    if (orientation === 'portrait' || this.calendar_type.includes("v")) {
      this.options.size = [SIZE_FORMAT[paper_size].size[1], SIZE_FORMAT[paper_size].size[0]]
      if (!this.calendar_type.includes("v")) {
        this.calendar_type = this.calendar_type + 'v'
      }
    }
    if (!month_start || ['m', '12m'].includes(this.calendar_type)) {
      month_start = 1
    } else {
      month_start = Number.parseInt(month_start)
    }
    this.weekday_start = typeof weekday_start === "undefined" ? 0 : Number.parseInt(weekday_start)

    const calendars = [{year: year, months: []}]
    let currentCursor = 0
    let x = 0
    _.times(ORIENTATION[this.calendar_type].total).forEach(i => {
      let nextMonth = month_start + i - x
      calendars[currentCursor].months.push(nextMonth)
      if (nextMonth === 12) {
        x = i
        year = year + 1
        currentCursor++
        month_start = 0
        calendars.push({year: year, months: []})
      }
    })

    this.pages = _
      .chain(calendars)
      .map(({year, months}) => {
        return _.chain(months).map((month) => {
          return moment([year, month - 1])
        }).chunk(1)
          .map((months) => {
            return createPage(months, holidays, this.weekday_start)
          })
          .value()
      })
      .flatten()
      .value();
    this.doc = new PDFDocument({
      autoFirstPage: false,
      size: this.options.size,
      margin: this.options.margin
    });
    this.doc.font('./fonts/Verdana.ttf');
  }

  getRect(row, col, calSize) {
    const w = calSize.w / 7
    const h = calSize.h / 6
    return {
      x: col * w + calSize.x,
      y: row * h + calSize.y,
      width: w,
      height: h
    }
  }

  drawRect(doc, x, y, width, height, isWeekend) {
    if (this.options.weekend_shaded && isWeekend) {
      doc
        .rect(x + 1, y, width, height)
        .fillColor("#F9F9F9")
        .fill();
    }
    doc.moveTo(x, y).lineTo(x + width, y).lineTo(x + width, y + height).strokeColor(this.options.lineColor).stroke();
  };

  drawDayTitle(doc, x, y, title, isActive, isHoliday, width, height) {
    const spacing = typeof this.options.dateTitle.spacing === 'number' ? this.options.dateTitle.spacing : this.options.spacingSmall
    doc
      .fillColor(this.options.dateTitle.color || this.options.fontColor)
      .fontSize(this.options.dateTitle.size)
      .text(title, x - spacing, y + (this.options.dateTitle.align === 'center' ? height / 2 : spacing), {
        width,
        height,
        align: this.options.dateTitle.align,
        baseline: this.options.dateTitle.align === 'center' ? 'middle' : undefined,
        lineBreak: false
      });
  };

  fillHead(doc, label, x, y, w, h) {
    h = h + this.options.spacingSmall * 2
    doc
      .rect(x, y, w, h)
      .fillColor(this.options[`${label}Title`].backgroundColor)
      .fill();
    doc.moveTo(x, y + h)
      .lineTo(x, y)
      .lineTo(x + w, y)
      .lineTo(x + w, y + h)
      .strokeColor(this.options.borderColor).stroke();
  }

  drawWeekdayTitle(doc, x, y, width, title) {
    let height = this.options.weekTitle.size
    if (this.options.weekTitle.length) {
      title = title.substring(0, this.options.weekTitle.length)
    }
    if (this.options.weekTitle.has_border) {
      this.fillHead(doc, 'week', x, y, width, height)
      x = x + this.options.spacingSmall
      height = height + this.options.spacingSmall * 2
    } else {
      height = height + this.options.spacingSmall
    }
    if (this.options.weekTitle.align === 'center') {
      x = x - this.options.spacingSmall
      y = y + this.options.spacingSmall / 2
    }
    doc
      .fontSize(this.options.weekTitle.size)
      .fillColor(this.options.weekTitle.color || this.options.fontColor)
      .text(this.options.weekTitle.isUpper ? title.toUpperCase() : title, x, y, {
        width,
        height,
        align: this.options.weekTitle.align,
      });

    return height
  };

  drawMonthName(doc, x, y, width, title) {
    let height = this.options.monthTitle.size
    if (this.options.monthTitle.has_border) {
      this.fillHead(doc, 'month', x, y, width, height)
      x = x + this.options.spacingSmall
      height = height + this.options.spacingSmall * 2
    } else {
      height = height + this.options.spacingSmall
    }
    doc
      .fillColor(this.options.monthTitle.color || this.options.fontColor)
      .fontSize(this.options.monthTitle.size)
      .text(this.options.monthTitle.isUpper ? title.toUpperCase() : title, x, y, {
        width,
        align: this.options.monthTitle.align,
      });
    return height
  };

  drawCell(row, col, {date, show}, calSize) {
    let {x, y, width, height} = this.getRect(row, col, calSize);
    this.drawRect(this.doc, x, y, width, height, date.isoWeekday() === 6 || date.isoWeekday() === 7);
    if (show) {
      this.drawDayTitle(this.doc, x, y, date.date(), false, false, width, height);
    }
  };

  weekdayNames() {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].slice(this.weekday_start, (7 + this.weekday_start))
  }

  getBaseNote(width, height) {
    let baseW = 0, baseH = 0, baseX = 0, baseY = 0;
    if (this.options.note.size) {
      if (this.options.note.size[0] <= 1) {
        this.options.note.size[0] = width * this.options.note.size[0]
      }
      if (this.options.note.size[1] <= 1) {
        this.options.note.size[1] = height * this.options.note.size[1]
      }
      if (this.options.note.align.includes("l")) {
        baseX = this.options.note.size[0] + this.options.spacing
        baseW = this.options.note.size[0] + this.options.spacing
      } else if (this.options.note.align.includes("r")) {
        baseW = this.options.note.size[0] + this.options.spacing
      } else if (this.options.note.align === 'b') {
        baseH = this.options.note.size[1] + this.options.spacing
      } else if (this.options.note.align === 't') {
        baseY = this.options.note.size[1] + this.options.spacing
        baseH = this.options.note.size[1] + this.options.spacing
      }
    }
    return {
      baseW, baseH, baseX, baseY
    }
  }

  getCoors(col, total, is_monthly) {
    let coors = [];
    let size = this.options.size;
    let margin = this.options.margin;
    let width = size[0] - margin * 2;
    let height = size[1] - margin * 2;
    let spacing = this.options.spacing;
    let x = margin;
    let y = margin;
    const {baseW, baseH, baseX, baseY} = this.getBaseNote(width, height)
    if (!this.options.note.is_inside) {
      x = x + baseX
      y = y + baseY
      width = width - baseW
      height = height - baseH
    }
    if (!is_monthly) {
      let layout = []
      _.times(total / col).forEach(i => {
        let arr = []
        _.times(col).forEach(j => {
          arr.push(1)
        })
        layout.push(arr)
      })
      let headHeight = this.options.yearTitle.size * 1.5
      /* START HERE */
      let ey = y + headHeight;
      let eh = (height - (layout.length - 1) * spacing - headHeight) / layout.length
      let ew = (width - (layout[0].length - 1) * spacing) / layout[0].length
      const {baseW, baseH, baseX, baseY} = this.getBaseNote(ew, eh)
      for (let row of layout) {
        let ex = x;
        for (let col of row) {
          coors.push({
            x: ex + (this.options.note.is_inside ? baseX : 0),
            y: ey + (this.options.note.is_inside ? baseY : 0),
            w: ew - (this.options.note.is_inside ? baseW : 0),
            h: eh - (this.options.note.is_inside ? baseH : 0),
            origin: {
              w: ew, h: eh,
              x: ex, y: ey
            }
          });
          ex = ex + ew + spacing
        }
        ey = ey + eh + spacing
      }
    } else {
      if (this.options.note.is_inside) {
        x = x + baseX
        y = y + baseY
        width = width - baseW
        height = height - baseH
      }
      _.times(12).forEach(i => {
        coors.push({
          x: x,
          y: y,
          w: width,
          h: height,
          origin: {
            w: width + (this.options.note.is_inside ? baseW : 0),
            h: height + (this.options.note.is_inside ? baseH : 0),
            x, y
          }
        })
      })
    }
    return coors
  }

  drawNote({w, h, x, y}) {
    if (this.options.note.size) {
      let px = x;
      let py = y;
      let pw = this.options.note.size[0];
      let ph = this.options.note.size[1];

      if (this.options.note.align.includes("r")) {
        px = x + w - pw
      }
      if (["lb", "rb", "b"].includes(this.options.note.align)) {
        py = y + h - ph
      }

      if (this.options.note.title.size) {
        this.doc
          .fillColor(this.options.fontColor)
          .fontSize(this.options.note.title.size)
          .text(
            this.options.note.title.isUpper ? "NOTES" : "Notes",
            px + this.options.note.title.margin,
            py + this.options.note.title.margin,
            {
              pw,
              align: this.options.note.title.align
            }
          );
      }

      let nextLine = 0
      while (true) {
        nextLine++
        if ((py + (nextLine - 1) * this.options.note.lineHeight) > h) break
        if (nextLine * this.options.note.lineHeight > this.options.note.title.margin + this.options.note.title.size) {
          this.doc.moveTo(px + this.options.note.title.margin, py + nextLine * this.options.note.lineHeight)
            .lineTo(px + pw - this.options.note.title.margin, py + nextLine * this.options.note.lineHeight)
            .strokeColor(this.options.note.lineColor).stroke();
        }
      }
      this.doc.moveTo(px, py)
        .lineTo(px, ph + py)
        .lineTo(px + pw, py + ph)
        .lineTo(px + pw, py)
        .lineTo(px, py)
        .strokeColor(this.options.note.borderColor).stroke();
    }
  }

  draw() {
    const is_monthly = ['m', 'mv'].includes(this.calendar_type);
    const {col, total} = ORIENTATION[this.calendar_type]
    const coors = this.getCoors(col, total, is_monthly)
    this.pages.forEach((page, i) => {
      let headHeight = 0
      let {x, y, w, h, origin} = coors[i]
      if (is_monthly || i === 0) {
        this.doc.addPage();
        this.doc
          .fillColor(this.options.backgroundColor)
          .rect(0, 0, this.options.size[0], this.options.size[1])
          .fill();
        if (this.options.yearTitle.size) {
          this.doc.fillColor(this.options.fontColor)
            .fontSize(this.options.yearTitle.size)
            .text(page.date.format("YYYY"), 0, this.options.margin, {
              width: this.options.size[0],
              align: 'center'
            });
        }
        if (!this.options.note.is_inside) {
          this.drawNote({
            w: this.options.size[0] - this.options.margin * 2,
            h: this.options.size[1] - this.options.margin * 2,
            x: this.options.margin,
            y: this.options.margin
          })
        }
      }
      if (this.options.note.is_inside) {
        this.drawNote(origin)
      }
      let pageTitle = page.date.format("MMMM")
      if (this.options.yearInTitle) {
        pageTitle = `${pageTitle} ${page.date.format("YYYY")}`
      }
      if (this.options.monthTitle.size) {
        headHeight = headHeight + this.drawMonthName(this.doc, x, y, w, pageTitle)
      }
      if (this.options.monthTitle.size) {
        const weekNames = this.weekdayNames()
        let temp = 0
        weekNames.forEach((title, i) => {
          const wx = x + i * w / 7;
          temp = this.drawWeekdayTitle(this.doc, wx, y + headHeight, w / 7, title);
        });
        headHeight = headHeight + temp
      }
      y = y + headHeight
      h = h - headHeight
      page.rows.forEach((cols, row) =>
        cols.forEach((cell, col) => {
          this.drawCell(row, col, cell, {x, y, w, h})
        })
      );
      this.doc.moveTo(x, y)
        .lineTo(x, h + y)
        .lineTo(x + w, y + h)
        .lineTo(x + w, y)
        .lineTo(x, y)
        .strokeColor("#000").stroke();
    });
    return this.doc
  }
}
