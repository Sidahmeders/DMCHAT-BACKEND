const BaseController = require('./BaseController')

module.exports = class CalendarController extends BaseController {
  #Calendar

  constructor({ Calendar }) {
    super()
    this.#Calendar = Calendar
  }

  fetchDayCalendar = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const dayCalendar = await this.#Calendar.findOne({ date: new Date(`${year}-${month}-${day}`) })
      res.status(200).json(dayCalendar)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  setCalendarDayAvailability = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const requestedDate = new Date(`${year}-${month}-${day}`)
      const foundCalendar = await this.#Calendar.findOne({ date: requestedDate })

      if (foundCalendar) {
        const updatedCalendarDay = await this.#Calendar.findByIdAndUpdate(foundCalendar._id, req.body, { new: true })
        return res.status(200).json(updatedCalendarDay)
      } else {
        const newCalendarDay = await this.#Calendar.create({ ...req.body, date: requestedDate })
        return res.status(201).json(newCalendarDay)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
