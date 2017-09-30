import _React, { PureComponent } from 'react'
import _ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { transform } from 'babel-standalone'

const React = _React
const ReactDOM = _ReactDOM

class DemoShow extends PureComponent {
    componentDidUpdate(prevProps) {
        if (prevProps.codeText !== this.props.codeText) {
            this.executeCode()
        }
    }
    transform() {
        return transform(this.props.codeText, {
            presets: ['es2015-loose', 'react', 'stage-1']
        }).code
    }
    executeCode() {
        const mountNode = this.mountNode
        try {
            const compiledCodeText = this.transform()
            eval(compiledCodeText)
        } catch(e) {
            console.info(e)
        }
    }
    componentDidCatch() {
        console.info(arguments)
    }
    render() {
        return <div ref={node => { this.mountNode = node }} />
    }
}

DemoShow.propTypes = {
    codeText: PropTypes.string,
}

DemoShow.defaultProps = {
    codeText: '',
}

export default DemoShow
