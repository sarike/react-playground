import React, { PureComponent } from 'react'
import * as api from '../api'

class ListPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: false,
        }
    }
    componentWillMount() {
        const { owner, repo } = this.props.match.params
        this.setState({ loading: true })
        api.fetchRepoDirs(owner, repo)
            .then(list => this.setState({ list }))
            .then(() => this.setState({ loading: false }))
            .catch(() => this.setState({ loading: false }))
    }
    renderItem(item) {
        const { owner, repo } = this.props.match.params
        return (
            <li key={item.path}>
                <a href={`#/${owner}/${repo}/${item.name}`}>
                    {item.name}
                </a>
            </li>
        )
    }
    render() {
        const { owner, repo } = this.props.match.params
        return (
            <div className="list">
                <h1>{owner}/{repo}</h1>
                {
                    this.state.loading
                        ? <span className="loading">正在加载中...</span>
                        : (
                            <ul>
                                {this.state.list.map(item => this.renderItem(item))}
                            </ul>
                        )
                }
                
            </div>
        )
    }
}

export default ListPage
