import { h, defineComponent } from "vue"
import { View } from "@tarojs/components"
import classNames from "classnames"
// import "@/style/components/calendar.scss"

const AtCalendarHeader = defineComponent({
    data: () => ({ addGlobalClass: true}),

    setup() {

        return () => {
            const rootClass = classNames('at-calendar__header', 'header')
            const days = ['日', '一', '二', '三', '四', '五', '六']

            return (
                h(View, { class: rootClass }, [
                    h(View, { class: 'header__flex'}, 
                        days.map((day, index) => {
                            return h(View, { class: 'header__flex-item', key: index}, day)
                        })
                    )
                ])
            )
        }
    }
})

export default AtCalendarHeader