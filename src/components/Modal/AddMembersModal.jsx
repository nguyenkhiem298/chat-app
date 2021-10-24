import { Avatar, Modal, Select , Form, Input, Spin} from 'antd'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../Context/AppProvider';
import { debounce } from 'lodash';
import { generateKeywords } from '../../firebase/service';
const { Option } = Select;

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props}) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);


    const debounceFetcher = useMemo(() => {

        const loadOption = (value) => {
            fetchOptions('Nguyen Manh Khiem');

        }

        return debounce(loadOption, debounceTimeout);

    }, [])

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="select users to add room"
            onChange={debounceFetcher}
            optionLabelProp="label"
            notFoundContent={fetching ? <Spin size='small'/> : null}
            {...props}
        >
            <Option value="displayName1" title='displayName' key='uid1'>
                <Avatar size='small' src='https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg'></Avatar>
                displayName
            </Option>
            <Option value="displayName2" title='displayName' key='uid2'>
                <Avatar size='small' src='https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg'></Avatar>
                displayName
            </Option>
            <Option value="displayName3" title='displayName' key='uid3'>
                <Avatar size='small' src='https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg'></Avatar>
                displayName
            </Option>
            <Option value="displayName4" title='displayName' key='uid4'>
                <Avatar size='small' src='https://i.pinimg.com/736x/68/7f/f5/687ff58b82cf34da0cd1369598f22104.jpg'></Avatar>
                displayName
            </Option>
        </Select>
    )
}

const fetchUserList = (mess) => {
    console.log('fetchUserList: ' + mess);
}

export default function AddMembersModal() {
    const {isModalAddMember, setIsModalAddMember, selectRoomId} = useContext(AppContext);
    const [value, setValue] = useState([])
    const [form] = Form.useForm();
    /*     const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState(''); */

    const handleOk = () => {
        form.resetFields();
        setIsModalAddMember(false);
    }

    const handleCancel = () => {
        setIsModalAddMember(false);
    }

    /* function openDropdown() {
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
    } */

    return (
        <div>
            <Modal
                title='Mời thêm thành viên'
                visible={isModalAddMember}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                    />
                </Form>
            </Modal>
      </div>
    )
}
