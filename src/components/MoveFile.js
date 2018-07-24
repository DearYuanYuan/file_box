import React from 'react';



import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Tree, Input } from 'antd';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
//search页面重命名模块



const gData = [
    {
        key: '注册管理', type: 'folder', id: '#001', code: 'lev1-001', lev: 'lev1', children: [
            { key: '未注册', type: 'file', id: '#001a', lev: 'lev2', code: 'lev1-01a' },
            { key: '未审核', type: 'file', id: '#001b', lev: 'lev2', code: 'lev1-01b' },
            {
                key: '未通过', type: 'folder', id: '#001c', lev: '2', code: 'lev1-01c', children: [
                    { key: '长得丑', type: 'file', id: '#001a1', lev: 'lev3', code: 'lev1-01a1' },
                    { key: '矮戳穷', type: 'folder', id: '#001a2', lev: 'lev3', code: 'lev1-01a2' },
                    { key: '呵呵哒', type: 'file', id: '#001a3', lev: 'lev3', code: 'lev1-01a3' }
                ]
            },
            { key: '已通过', type: 'file', id: '#001d', lev: 'lev2', code: 'lev1-01d' },
        ]
    },
    {
        key: '房源管理', type: 'folder', id: '#00d', code: 'lev1-002', lev: 'lev1', children: [
            { key: '私有房源', type: 'file', id: '#00d1', lev: 'lev2', code: 'lev1-002a' },
            { key: '中介房源', type: 'folder', id: '00d2', lev: 'lev2', code: 'lev1-002b' }
        ]
    },
    { key: '库存管理', type: 'folder', id: '#00k', lev: 'lev1', code: 'lev1-003' },
    { key: '员工管理', type: 'folder', id: '#00e', lev: 'lev1', code: 'lev1-004' },
    { key: '基础管理', type: 'folder', id: '#00b', lev: 'lev1', code: 'lev1-005' }
];;


const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};



class MoveFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }

    }


    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    render() {
        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            const index = item.key.indexOf(searchValue);
            const beforeStr = item.key.substr(0, index);
            const afterStr = item.key.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.key}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });

        return (


            <Modal
                title="移动至…"
                style={{ top: 20 }}
                visible={this.props.openMoveFile}
                onOk={this.props.submitMove}
                onCancel={this.props.closeMove}
            >
                <p>Path : sample folder/Inside folder/sample subfolder/</p>
                <Tree
                    showLine
                    onExpand={this.onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onSelect={this.onSelect}
                >
                    {loop(gData)}
                </Tree>
            </Modal>


        )
    }
}

export default MoveFile