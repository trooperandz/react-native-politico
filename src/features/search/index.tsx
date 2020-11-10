import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Input } from '@ui-kitten/components';

import EmptySearchSVG from '@ph/assets/search.svg';
import { SearchOutline } from '@ph/comps/Icons';
import { AuthSliceState } from '@ph/feats/auth/types';
import { RepresentativeProfile } from '@ph/feats/feed/types';
import RepresentativesScrollList from '@ph/feats/search/components/RepresentativesScrollList';
import { API_BASE_URL } from 'utils/constants';
import { debounce } from 'utils/helperFunctions';
import { styles } from './styles';
import * as S from './styles';

const screenHeight = Dimensions.get('screen').height;
const svgDimension = screenHeight * 0.2;

interface SearchRequestParams {
  query: string;
  UserID: string;
}

interface SearchResult {
  first_name: string;
  fixedsize: string;
  fullName: string;
  id: string;
  last_name: string;
  party: 'R' | 'D';
}

const getSearchResults = async (
  requestParams: SearchRequestParams,
  callback?: (arg0: SearchResult[]) => void,
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/RepSearch`, {
      ...requestParams,
    });
    callback && callback(response.data.results);
  } catch (error) {
    callback && callback([]);
    console.log('Error getting search results:', error);
  }
};

const getDebouncedSearchResults = debounce(getSearchResults, 500);

const SearchScreen = () => {
  const user = useSelector((state: AuthSliceState) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | []>([]);
  const showEmptySearch =
    searchQuery.length === 0 || searchResults.length === 0;

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
    } else {
      getDebouncedSearchResults(
        { query: searchQuery, UserID: user.uid },
        setSearchResults,
      );
    }
  }, [searchQuery]);

  const EmptySearch = () => (
    <S.ResultsContainer>
      <S.SVGContainer>
        <EmptySearchSVG height={svgDimension} width={svgDimension} />
      </S.SVGContainer>
      <S.EmptyText category="h4">Search by</S.EmptyText>
      <S.EmptyText category="h4">Representative Name</S.EmptyText>
    </S.ResultsContainer>
  );

  const ResultsList = () => (
    <ScrollView
      style={styles.resultsContainer}
      contentContainerStyle={styles.resultsList}>
      <RepresentativesScrollList
        representatives={searchResults as RepresentativeProfile[]}
      />
    </ScrollView>
  );

  return (
    <S.SearchContainer>
      <S.SearchHeaderContainer>
        <S.HeaderText category="s1">Search</S.HeaderText>
        <Input
          size="large"
          placeholder="Search"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearchQuery}
          value={searchQuery}
          icon={SearchOutline}
        />
      </S.SearchHeaderContainer>
      {showEmptySearch ? <EmptySearch /> : <ResultsList />}
    </S.SearchContainer>
  );
};

export default SearchScreen;
