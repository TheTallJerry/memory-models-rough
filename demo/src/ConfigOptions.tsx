import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    FormControlLabel,
    Checkbox,
    FormGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { presets } from "../../src/style";
const ConfigOptions = (props) => {
    // form based cards to enter style based on id
    // selecting id will automatically give out available styles using presets
    // so should pass in jsonResult
    //TODO: use state from App
    const [cards, setCards] = useState([
        {
            id: "",
            name: "",
            forOverall: false,
            styles: [{ style: "", value: "" }],
        },
    ]);
    const [ids, setIds] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        if (props.jsonResult) {
            props.jsonResult.forEach((json) => {
                if (json.id) {
                    setIds((prev) => [...prev, json.id]);
                } else if (json.name !== "BLANK") {
                    setNames((prev) => [...prev, json.name]);
                }
            });
            setIds((prev) => [...prev, "empty"]);
            setNames((prev) => [...prev, "empty"]);
        }
    }, [props.jsonResult]);

    const handleChange = (cardIndex, rowIndex, type, e) => {
        const { value } = e.target;
        const updatedCards = [...cards];
        if (type === "style") {
            updatedCards[cardIndex].styles[rowIndex].style = value;
        } else if (type === "value") {
            updatedCards[cardIndex].styles[rowIndex].value = value;
        } else if (type === "name") {
            updatedCards[cardIndex].name = value;
        } else if (type === "id") {
            updatedCards[cardIndex].id = value;
        }
        setCards(updatedCards);
    };

    const handleAddRow = (cardIndex) => {
        const updatedCards = [...cards];
        updatedCards[cardIndex].styles.push({ style: "", value: "" });
        setCards(updatedCards);
    };

    const handleDeleteRow = (cardIndex, rowIndex) => {
        const updatedCards = [...cards];
        updatedCards[cardIndex].styles.splice(rowIndex, 1);
        setCards(updatedCards);
    };

    const handleAddCard = () => {
        setCards([
            ...cards,
            {
                id: "",
                name: "",
                forOverall: false,
                styles: [{ style: "", value: "" }],
            },
        ]);
    };

    const handleDeleteCard = (cardIndex) => {
        if (cards.length > 1) {
            const updatedCards = [...cards];
            updatedCards.splice(cardIndex, 1);
            setCards(updatedCards);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container justifyContent="left">
                {cards.map((card, cardIndex) => (
                    <Grid item key={cardIndex} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <h5>Custom Style</h5>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="For Overall Style?"
                                        value={card.forOverall}
                                        onChange={() => {
                                            const updatedCards = [...cards];
                                            updatedCards[cardIndex].forOverall =
                                                !updatedCards[cardIndex]
                                                    .forOverall;
                                            setCards(updatedCards);
                                        }}
                                    />
                                </FormGroup>
                                <FormControl fullWidth>
                                    <InputLabel id="id-select-label">
                                        ID
                                    </InputLabel>
                                    <Select
                                        labelId="id-select-label"
                                        label="ID"
                                        value={card.id}
                                        onChange={(e) =>
                                            handleChange(cardIndex, 0, "id", e)
                                        }
                                        disabled={card.forOverall}
                                    >
                                        {ids.map((id) => (
                                            <MenuItem
                                                key={id}
                                                value={id === "empty" ? "" : id}
                                            >
                                                {id}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    disabled={card.forOverall}
                                >
                                    <InputLabel id="name-select-label">
                                        Name
                                    </InputLabel>
                                    <Select
                                        label="Name"
                                        labelId="name-select-label"
                                        value={card.name}
                                        onChange={(e) =>
                                            handleChange(
                                                cardIndex,
                                                0,
                                                "name",
                                                e
                                            )
                                        }
                                    >
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={
                                                    name === "empty" ? "" : name
                                                }
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TableContainer
                                    sx={{
                                        mt: 2,
                                        height: "200px",
                                        overflow: "auto",
                                    }}
                                >
                                    <Table>
                                        <TableBody>
                                            {card.styles.map(
                                                (row, rowIndex) => (
                                                    <TableRow key={rowIndex}>
                                                        <TableCell>
                                                            <TextField
                                                                value={
                                                                    row.style
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        cardIndex,
                                                                        rowIndex,
                                                                        "style",
                                                                        e
                                                                    )
                                                                }
                                                                fullWidth
                                                                margin="none"
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder="Style"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                value={
                                                                    row.value
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        cardIndex,
                                                                        rowIndex,
                                                                        "value",
                                                                        e
                                                                    )
                                                                }
                                                                fullWidth
                                                                margin="none"
                                                                variant="outlined"
                                                                size="small"
                                                                placeholder="Value"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                disabled={
                                                                    cards[
                                                                        cardIndex
                                                                    ].styles
                                                                        .length ===
                                                                    1
                                                                }
                                                                onClick={() =>
                                                                    handleDeleteRow(
                                                                        cardIndex,
                                                                        rowIndex
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddRow(cardIndex)}
                                        sx={{ mb: 2 }}
                                    >
                                        Add Style Row
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            handleDeleteCard(cardIndex)
                                        }
                                        disabled={cards.length === 1}
                                    >
                                        Delete Card
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="contained"
                onClick={handleAddCard}
                sx={{ mt: 2, mb: 2 }}
            >
                Add Card
            </Button>
        </Box>
    );
};

export default ConfigOptions;
