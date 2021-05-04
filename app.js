const {fromPath} = require("pdf2pic");
const hash = require('object-hash');
const bodyParser = require('body-parser')
const app = require('express')()
const cors = require('cors')
const PDFCalendar = require("./calendar/calendar")
const fs = require('fs');
const Holidays = require('date-holidays')
const {SIZE_FORMAT} = require("./calendar/template")
const pdf_dir = './data/pdf';
const img_dir = './data/images';
const {ORIENTATION, STYLES} = require("./calendar/template")
if (!fs.existsSync(pdf_dir)) {
  fs.mkdirSync(pdf_dir);
}
if (!fs.existsSync(img_dir)) {
  fs.mkdirSync(img_dir);
}
const listAllow = ['http://127.0.0.1:3000', 'https://calendar-2021-tau.vercel.app']

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (listAllow.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {origin: true} // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {origin: false} // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const hd = new Holidays("US")

app.use(bodyParser.json())
app.all('/maker', cors(corsOptionsDelegate), (req, res, next) => {
  const is_force = req.query.force === true || req.query.force === 'true'
  const is_preview = req.query.preview === true || req.query.preview === 'true'
  let {
    style,
    type,
    year,
    day_size,
    orientation,
    paper_size,
    weekend_shaded,
    grid_lines,
    grid_color,
    weekday_start,
    month_start
  } = req.query
  if (!paper_size) paper_size = 'letter';

  const filename = hash({
    style,
    type,
    year,
    day_size,
    orientation,
    paper_size,
    weekend_shaded,
    grid_lines,
    grid_color,
    weekday_start,
    month_start
  })
  const pdf_path = `${pdf_dir}/${filename}.pdf`
  const img_path = `${img_dir}/${filename}.1.jpg`
  if (!fs.existsSync(pdf_path) || !fs.existsSync(img_path) || is_force) {
    const instance = new PDFCalendar({
      style,
      type,
      year,
      day_size,
      orientation,
      paper_size,
      weekend_shaded,
      grid_lines,
      grid_color,
      weekday_start,
      month_start
    })
    const doc = instance.draw()
    doc.pipe(fs.createWriteStream(pdf_path));
    const convert = fromPath(pdf_path, {
      saveFilename: filename,
      savePath: img_dir,
      format: "jpg",
      width: SIZE_FORMAT[paper_size].size[orientation === 'portrait' || (type && type.includes("v")) ? 1 : 0],
      height: SIZE_FORMAT[paper_size].size[orientation === 'portrait' || (type && type.includes("v")) ? 0 : 1]
    })
    const cvt = function () {
      convert(1).then(data => {
        if (is_preview) {
          const readStream = fs.createReadStream(data.path);
          readStream.pipe(res);
        } else {
          const readStream = fs.createReadStream(pdf_path);
          readStream.pipe(res);
        }
      }).catch(() => cvt)
    }
    cvt()
    doc.end()
  } else {
    if (is_preview) {
      const readStream = fs.createReadStream(`${img_dir}/${filename}.1.jpg`);
      readStream.pipe(res);
    } else {
      const readStream = fs.createReadStream(pdf_path);
      readStream.pipe(res);
    }
  }
})
app.all('/holidays', cors(corsOptionsDelegate), (req, res) => {
  return res.json(hd.getHolidays(req.query.year ? Number.parseInt(req.query.year) : 2021))
})
app.all('/printable/', cors(corsOptionsDelegate), (req, res) => {
  return res.json(Object.keys(ORIENTATION).map(field => {
    return {
      type: field
    }
  }))
})
app.all('/printable/:slug', cors(corsOptionsDelegate), (req, res) => {
  return res.json(Object.keys(STYLES).map(field => ({
    style: field,
  })))
})
app.all('/printable/:type/:value', cors(corsOptionsDelegate), (req, res) => {
  return res.json({})
})
module.exports = app
