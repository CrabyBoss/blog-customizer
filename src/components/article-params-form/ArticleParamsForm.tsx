import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';

import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useCloseForm } from './hooks/useCloseForm';

type ArticleParamsFormProps = {
	resetStyles: () => void;
	applyStyles: () => void;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
};

export const ArticleParamsForm = ({
	resetStyles,
	applyStyles,
	setState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	const changeFormState = (name: string) => {
		return (value: OptionType) => {
			setFormState((state) => ({
				...state,
				[name]: value,
			}));
		};
	};

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		setState(formState);
	};

	const resetHandler = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={() => !isOpen && toggleOpen()} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={submitHandler}
					onChange={resetHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
						onChange={changeFormState('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={changeFormState('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={changeFormState('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='цвет фона'
						onChange={changeFormState('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={changeFormState('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyles} />
						<Button title='Применить' type='submit' onClick={applyStyles} />
					</div>
				</form>
			</aside>
		</>
	);
};
