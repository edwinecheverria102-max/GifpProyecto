import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { GiftApp } from './GiftApp'

describe('test a los gift', () => {
    test('deveria renderizar las propiedades de componentes', () => {
        const { container } = render(<GiftApp />)
        expect(container).toMatchSnapshot()
    })
})