import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { useSearch } from '../hooks';

export const SearchBox: FC = () => {
  const { submitSearch, clearSearch } = useSearch();
  const [query, setQuery] = useState('');

  const handleTextChange = (text: string) => {
    const parsed = text.toLowerCase().toString().trim();

    setQuery(parsed);
  };

  const handleClearSearch = () => {
    setQuery('');
    clearSearch();
  };

  return (
    <View>
      <SearchBar
        value={query}
        autoCapitalize="none"
        onChangeText={handleTextChange}
        onClear={handleClearSearch}
        round={true}
        placeholder="Search"
        inputContainerStyle={{ maxHeight: 30, minWidth: 225 }}
        containerStyle={{
          borderWidth: 0,
          padding: 0,
          margin: 0,
          borderRadius: 25,
        }}
      />
    </View>
  );
};
