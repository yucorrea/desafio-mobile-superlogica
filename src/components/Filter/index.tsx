
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from "@expo/vector-icons";
import { TouchableNativeFeedback} from 'react-native';

import { Character } from '../../@types/character';

import api from '../../services/api';
import theme from '../../global/styles/theme';

import {
    addCharacters,
    setFiltering
} from "../../redux/reducers/character";

import { selectFavorite } from "../../redux/reducers/favorite";

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

    const { favorites } = useSelector(selectFavorite)

    const fetchCharacters = (search = '') => {
        api.get(`/character?name=${search}`).then(res => {

            dispatch(addCharacters(res.data.results))

        }).catch((err) => {
            dispatch(addCharacters([]))
        });

    }

    const handleInputSearch = useCallback(() => {
        dispatch(setFiltering(true))

        if (search === '' && selected === 1) {
            dispatch(setFiltering(false))
        }

        if (selected === 1) {
            fetchCharacters(search)
        } else {
            const filteredFavorites = favorites.filter((character : Character) => character.name.includes(search))
            dispatch(addCharacters(filteredFavorites))
        }

    }, [search, selected, favorites])

    const handleApplyFilters = useCallback(() => {
        dispatch(setFiltering(true))
        if (selected === 1) {
            fetchCharacters()
        } else {
            dispatch(addCharacters(favorites))
        }
        setModal(false)

    }, [selected])

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




