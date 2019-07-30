/* eslint-env jest */
import { render } from '@testing-library/react'

import App from '../../pages/index.js'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { initialState as tweetsInitialState } from '../../reducers/tweetsReducer';

describe('index pages', () => {
    describe('render()', () => {
        const initialState = {
            tweetsReducer: tweetsInitialState
        }
        const mockStore = configureStore()
        let store

        it('renders the component', () => {
            store = mockStore(initialState)
            const { firstChild } = render(<Provider store={store}><App /></Provider>)
            expect(firstChild).toMatchSnapshot()
        })
    })
});