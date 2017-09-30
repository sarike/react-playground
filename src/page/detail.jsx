import _React, { PureComponent } from 'react'
import * as api from '../api'
import CodeEditor from '../component/code-editor'
import DemoShow from '../component/demo-show'

const React = _React

class DetailPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            owner: '',
            repo: '',
            path: '',
            codeText: '',
            cssCodeText: '',
            loding: false,
        }
    }
    componentWillMount() {
        const { owner, repo, path } = this.props.match.params
        this.setState({ owner, repo, path, loading: true })
        api.fetchFileContent(owner, repo, `${path}/main.jsx`).then(codeText => this.setState({ codeText }))
        api.fetchFileContent(owner, repo, `${path}/main.css`)
            .then(cssCodeText => {
                this.setState({ cssCodeText })
                this.handleCSSChange(cssCodeText)
            })
    }

    handleChange(codeText) {
        this.setState({ codeText })
    }
    handleCSSChange(cssCodeText) {
        let styleNode = this.styleNode
        const reg = /([\s\.\w\-_]+?)\{/g
        const processedCSS = cssCodeText
            .replace("\n", '')
            .replace(reg, (_, selector) => ` .demo ${selector} {`)
        const newTextNode = document.createTextNode(processedCSS)
        if (!styleNode) {
            styleNode = document.createElement('style')
            styleNode.type = 'text/css'
            styleNode.appendChild(newTextNode)
            document.querySelector('head').appendChild(styleNode)
            this.styleNode = styleNode
            
        } else {
            styleNode.replaceChild(newTextNode, this.textNode)
        }
        this.textNode = newTextNode
        
    }
    render() {
        return (
            <div className="detail">
                <div className="left">
                    <div className="demo">
                        <DemoShow codeText={this.state.codeText} />
                    </div>
                    <div className="css-editor">
                        <CodeEditor
                            mode="css"
                            codeText={this.state.cssCodeText}
                            onChange={cssCodeText => this.handleCSSChange(cssCodeText)}
                        />
                    </div>
                </div>
                <div className="right">
                    <CodeEditor
                        mode="jsx"
                        codeText={this.state.codeText}
                        onChange={codeText => this.handleChange(codeText)}
                    />
                </div>
            </div>
        )
    }
}

export default DetailPage
