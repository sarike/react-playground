import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'codemirror';
import 'codemirror/addon/runmode/runmode';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';

class CodeEditor extends PureComponent {
    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.textare, {
            mode: this.props.mode,
            lineNumbers: true,
            tabSize: 2,
            theme: 'solarized light',
        });
        this.editor.on('change', editor => this.props.onChange(editor.getValue()));
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.codeText.trim()) {
            setTimeout(() => this.editor.setValue(this.props.codeText))
        }
    }

    render() {
        return (
            <div className="code-editor">
                <div className="mode">{this.props.mode}</div>
                <textarea
                    ref={textarea => (this.textare = textarea) }
                    defaultValue={this.props.codeText}
                />
            </div>
        )
    }
}

CodeEditor.propTypes = {
    mode: PropTypes.string,
    codeText: PropTypes.string,
    onChange: PropTypes.func,
}

CodeEditor.defaultProps = {
    mode: 'jsx',
    codeText: '',
    onChange: () => null,
}

export default CodeEditor
