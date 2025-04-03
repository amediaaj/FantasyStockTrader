import { BrowserRouter } from 'react-router';
import NotFound from './NotFound'
import { render } from '@testing-library/react';

describe('App tests', () => {
    it('Should render component', () => {
        render(
            <BrowserRouter>
                (<NotFound />)
            </BrowserRouter>
        )
        expect(true).toBeTruthy();
    })
})