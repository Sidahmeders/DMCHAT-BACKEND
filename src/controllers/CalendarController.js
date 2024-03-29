const BaseController = require('./BaseController')

module.exports = class CalendarController extends BaseController {
  #Calendar

  constructor({ Calendar }) {
    super()
    this.#Calendar = Calendar
  }

  fetchMonthCalendarAvailability = async (req, res) => {
    try {
      const { year, month } = req.params
      const monthCalendar = await this.#Calendar.find({
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-31`),
        },
      })

      this.handleSuccess(res, monthCalendar)
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
        return this.handleSuccess(res, updatedCalendarDay)
      }
      const newCalendarDay = await this.#Calendar.create({ ...req.body, date: requestedDate })

      this.handleSuccess(res, newCalendarDay, 201)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
