
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Feather } from "@expo/vector-icons";
import { TouchableNativeFeedback} from 'react-native';

import theme from '../../global/styles/theme';

import { setFilterCharacters } from '../../redux/reducers/character';

import { Modal } from '../Modal';

import {
    Container,
    InputContainer,
    Input,
    Button,
    OptionsFilter,
    FilterButton,
    FilterButtonText,
    Title,
    ApplyFilterButton,
    ApplyFilterButtonText
} from './styles';

export function Filter() {

    const [optionsFilter] = useState([
        { id: 1, name: "All" },
        { id: 2, name: "Favorites" }
    ]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(1);
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleInputSearch = useCallback(() => {
        dispatch(setFilterCharacters({  search: search, option: selected }))
    }, [search, selected])

    const handleApplyFilters = useCallback(() => {
        dispatch(setFilterCharacters({  search: search, option: selected }))
        setModal(false)
    }, [selected, search])

    return (
        <>
            <Container>
                <InputContainer>
                    <Input
                        placeholder="Search by character"
                        placeholderTextColor={theme.colors.text}
                        value={search}
                        onChangeText={e => setSearch(e)}
                        onSubmitEditing={handleInputSearch}
                    />
                    <Button onPress={handleInputSearch}>
                        <Feather size={24} color={theme.colors.title} name="search" />
                    </Button>
                </InputContainer>

                <TouchableNativeFeedback onPress={() => setModal(true)}>
                    <Feather size={24} color={theme.colors.title} name="filter" />
                </TouchableNativeFeedback>

            </Container>

            <Modal show={modal} close={() => setModal(false)} >

                <Title>Category</Title>
                <OptionsFilter>
                    {optionsFilter.map(option => (
                        <FilterButton
                            key={option.id.toString()}
                            selected={option.id === selected}
                            onPress={() => setSelected(option.id)}
                        >
                            <FilterButtonText selected={option.id === selected}>
                                {option.name}
                            </FilterButtonText>
                        </FilterButton>
                    ))}
                </OptionsFilter>

                <ApplyFilterButton onPress={handleApplyFilters}>
                    <ApplyFilterButtonText>Apply</ApplyFilterButtonText>
                </ApplyFilterButton>
            </Modal>
        </>
    )

}




