const base = 'https://api.github.com/repos'

/**
 * 获取仓库的目录列表
 * @param {String} owner 仓库拥有者
 * @param {String} repo 仓库名称
 */
export function fetchRepoDirs(owner, repo) {
    const url = `${base}/${owner}/${repo}/contents`
    return fetch(url)
        .then(res => res.json())
        .then(list => list.filter(item => item.type === 'dir'))
}

export function fetchFileContent(owner, repo, path) {
    const url = `${base}/${owner}/${repo}/contents/${path}`
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            if (res.type === 'file') {
                return decodeURIComponent(escape(atob(res.content)))
            }
            throw new Error(`${path} is not a file.`)
        })
}
