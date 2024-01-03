import { Input } from 'antd';
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        // Call the onSearch prop with the current search value
        onSearch(searchValue);
    };

    return (
        <Input.Search
            style={{ width: 200 }}
            placeholder="Tìm tên sản phẩm..."
            enterButton
            // value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />

    );
};

export default Search;