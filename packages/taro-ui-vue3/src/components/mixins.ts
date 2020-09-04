import { AtComponent } from "types/base";

const AtComponentWithDefaultProps = {
    props: {
        className: {
            type: String as () => AtComponent['className'],
            default: ''
        },
        customStyle: {
            type: [String, Object] as unknown as () => AtComponent['customStyle'],
            default: ''
        }
    }
}

export default AtComponentWithDefaultProps