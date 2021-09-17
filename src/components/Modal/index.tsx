import React, { useState, useEffect } from 'react';
import { Animated, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const { height } = Dimensions.get('window')

import theme from '../../global/styles/theme';

import {
    ModalContainer,
    ModalContent,
    Close,
    Header,
} from './styles';

interface Props {
    show: Boolean,
    close: () => void,
    children: React.ReactNode
}

export function Modal({ show, close, children }: Props) {

    const [modal] = useState(new Animated.Value(height));
    const [container] = useState(new Animated.Value(height));
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        show ? openModal() : closeModal()
    }, [show])

    const openModal = () => {
        Animated.sequence([
            Animated.timing(container, { toValue: 0, duration: 100, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.spring(modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
        ]).start()
    }

    const closeModal = () => {
        Animated.sequence([
            Animated.timing(modal, { toValue: height, duration: 250, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(container, { toValue: height, duration: 100, useNativeDriver: true })
        ]).start()
    }

    return (

        <ModalContainer style={{ transform: [{ translateY: container }], opacity: opacity }}>
            {show && (
                <ModalContent style={{ transform: [{ translateY: modal }] }} >

                    <Header>
                        <Close onPress={close}>
                            <Feather name="x" size={24} color={theme.colors.text} />
                        </Close>
                    </Header>

                    {children}

                </ModalContent>
            )}
        </ModalContainer>
    )

}