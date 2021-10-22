import { Modal } from 'antd'
import React, { useCallback, useContext, useState } from 'react'
import { AppContext } from '../Context/AppProvider';
import { debounce } from 'lodash';


export default function AddMembersModal() {
    const {isModalAddMember, setIsModalAddMember} = useContext(AppContext);
    const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState('');

    const handleOk = () => {
        setIsModalAddMember(false);
    }

    const handleCancel = () => {
        setIsModalAddMember(false);
    }

    function openDropdown() {
        setVisible(true);
    }

    function fetchDropdownOptions(key) {
        console.log(key);
    }

    const debounceDropDown = useCallback(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), [])

    function handleInputOnchange(e) {
        const { value } = e.target;
        console.log(value, 123);
        setKeyword(value);
        debounceDropDown(value);
    }

    return (
        <div>
            <Modal 
                title='Mời thêm thành viên' 
                visible={isModalAddMember} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <input value={keyword} placeholder='Enter string' onClick={openDropdown} onChange={handleInputOnchange} />
            </Modal>
        </div>
    )
}
