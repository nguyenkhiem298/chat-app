import { Avatar, Modal, Select , Form, Input, Spin} from 'antd'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../Context/AppProvider';
import { debounce } from 'lodash';
import { generateKeywords } from '../../firebase/service';
import { db } from '../../firebase/config';
const { Option } = Select;

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props}) {

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);


    const debounceFetcher = useMemo(() => {

        const loadOption = (value1) => {
            // console.log({value1});
            setOptions([]);
            setFetching(true);

            fetchOptions(value1).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            })
        }

        return debounce(loadOption, debounceTimeout);

    }, [fetchOptions, debounceTimeout])

    useEffect(() => {
        return () => {
          // clear when unmount
          setOptions([]);
        };
      }, []);

    return (
         <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {
                options.map((opt) => {
                    return (
                        <Select.Option value={opt.value} title={opt.label} key={opt.value}>
                            <Avatar 
                                size='small' 
                                src={opt.photoURL}>
                            </Avatar>
                            {` ${opt.label}`}
                        </Select.Option>
                    )
                })
            }
        </Select>
    )
}

// Call API to search
async function fetchUserList(search) {
    // console.log(search);
    return db
        .collection('user')
        .where('keyworks', 'array-contains', search?.toLowerCase())
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs.map((doc) => ({
                label: doc.data().displayName,
                value: doc.data().uid,
                photoURL: doc.data().photoURL,
            }))
        })
}


export default function AddMembersModal() {
    const {isModalAddMember, setIsModalAddMember, selectRoomId, selectRoom} = useContext(AppContext);
    const [value2, setValue1] = useState([])
    const [form] = Form.useForm();
    /*     const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState(''); */

    const handleOk = () => {

        console.log({value2});

        console.log({selectRoomId});
        
        const listMember = [];
        listMember.push(...selectRoom.members);
        value2.map((el) => {
            listMember.push(el.value);
        })
        
        const roomRef = db.collection('rooms').doc(selectRoomId); 

        roomRef.update({
            members: listMember
        })
        
        listMember = [];
        
        console.log({listMember});



        form.resetFields();
        setValue1([]);
        setIsModalAddMember(false);
    }
    
    const handleCancel = () => {
        form.resetFields();
        setValue1([]);
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
                        value={value2}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue1(newValue)}
                        style={{ width: '100%' }}
                    />
                </Form>
            </Modal>
      </div>
    )
}
