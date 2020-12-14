import { mount } from '@vue/test-utils'
import AtList from '../index'
import AtListItem from '../item'

describe('List Snap', () => {
  it('should render the complete List', () => {
    const wrapper = mount({
      data() {
        return {
          iconInfo: {
            size: 25,
            color: '#78A4FA',
            value: 'calendar',
          },
        }
      },
      components: {
        AtList,
        AtListItem,
      },
      template: `
    <AtList>
      <AtListItem title='标题文字' />
      <AtListItem title='标题文字' arrow='right' />
      <AtListItem title='标题文字' note='描述信息' />
      <AtListItem title='禁用状态' disabled extraText='详细信息' />
      <AtListItem title='标题文字' note='描述信息' arrow='right' />
      <AtListItem title='标题文字' extraText='详细信息' arrow='right' />
      <AtListItem
        arrow='right'
        note='描述信息'
        title='标题文字标题文字标题文字标题文字标题文字'
        extraText='详细信息详细信息详细信息详细信息'
      />
      <AtListItem
        title='标题文字'
        note='描述信息'
        extraText='详细信息'
        arrow='right'
        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem
        arrow='right'
        note='描述信息'
        :iconInfo="iconInfo"
        title='标题文字'
        extraText='详细信息'
        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
      />
      <AtListItem title='标题文字' isSwitch />
      <AtListItem title='标题文字' isSwitch disabled />
      <AtListItem title='标题文字' switchIsCheck isSwitch />
      <AtListItem title='标题文字' switchIsCheck isSwitch disabled />
    </AtList>
      `,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should render the completed List -- no border', () => {
    const wrapper = mount({
      components: {
        AtList,
        AtListItem,
      },
      template: `
      <AtList :hasBorder="false">
        <AtListItem title='标题文字' :hasBorder="false" />
        <AtListItem title='标题文字' :hasBorder="false" />
      </AtList>
      `,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

describe('List Behavior ', () => {
  it('ListItem onClick should be called', () => {
    const onClick = jest.fn()
    const wrapper = mount({
      components: {
        AtList,
        AtListItem,
      },
      methods: {
        onClick: onClick,
      },
      template: `
      <AtList>
        <AtListItem title='标题文字' @click="onClick" />
      </AtList>
      `,
    })
    wrapper.find('.at-list .at-list__item').trigger('tap')
    expect(onClick).toBeCalled()
  })

  it('ListItem onSwitchChange should be called', async () => {

    const wrapper = mount({
      data: () => ({
        checked: false
      }),
      components: {
        AtList,
        AtListItem,
      },
      methods: {
        onSwitchChange: jest.fn().mockImplementation((e) => {
          wrapper.vm.$data.checked = e.detail
        })
      },
      template: `
        <AtList>
          <AtListItem
            title='标题文字'
            is-switch
            :switch-is-check="checked"
            @switch-change="onSwitchChange"
          />
        </AtList>
      `,
    })
    expect(wrapper.vm.$data.checked).toBeFalsy()
    wrapper.find('.at-list .at-list__item .item-extra__switch switch').trigger('change', { detail: true })
    expect(wrapper.vm.$data.checked).toBeTruthy()
  })

  it('ListItem switch should be checked', () => {
    const wrapper = mount({
      components: {
        AtList,
        AtListItem,
      },
      template: `
        <AtList>
          <AtListItem
            title='标题文字'
            is-switch
            switch-is-check
          />
        </AtList>
      `,
    })
    const switchEl = wrapper.find('.at-list .at-list__item .item-extra__switch switch')
    expect(switchEl.attributes('checked')).toBe("true")
  })

  it('ListItem switch should be unchecked', () => {
    const wrapper = mount({
      components: {
        AtList,
        AtListItem,
      },
      template: `
        <AtList>
          <AtListItem
            title='标题文字'
            is-switch
          />
        </AtList>
      `,
    })
    const switchEl = wrapper.find('.at-list .at-list__item .item-extra__switch switch')
    expect(switchEl.attributes('checked')).toBe("false")
  })
})
