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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { presets } from "../../src/style";
const ConfigOptions = (props) => {
    // form based cards to enter style based on id
    // selecting id will automatically give out available styles using presets
    // so should pass in jsonResult
    const [cards, setCards] = useState([
        { id: "", name: "", styles: [{ style: "", value: "" }] },
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
        }
    }, [props.jsonResult]);

    const handleChange = (cardIndex, rowIndex, type, e) => {
        const { value } = e.target;
        const updatedCards = [...cards];
        if (type === "style") {
            updatedCards[cardIndex].styles[rowIndex].style = value;
        } else if (type === "value") {
            updatedCards[cardIndex].styles[rowIndex].value = value;
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
            { id: "", name: "", styles: [{ style: "", value: "" }] },
        ]);
    };

    const handleDeleteCard = (cardIndex) => {
        if (cards.length > 1) {
            const updatedCards = [...cards];
            updatedCards.splice(cardIndex, 1);
            setCards(updatedCards);
        }
    };

    //TODO: define configs state in parent and pass down
    // and onSubmit, merge configs into jsonResult before passing to draw
    const combineStyles = () => {};

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2} justifyContent="left">
                {cards.map((card, cardIndex) => (
                    <Grid item key={cardIndex} xs={12} sm={6} md={6} lg={4}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Custom Style
                                </Typography>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel>ID</InputLabel>
                                    <Select
                                        name="id"
                                        value={card.id}
                                        onChange={(e) =>
                                            handleChange(cardIndex, 0, "id", e)
                                        }
                                    >
                                        {ids.map((id) => (
                                            <MenuItem key={id} value={id}>
                                                {id}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel>Name</InputLabel>
                                    <Select
                                        name="name"
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
                                            <MenuItem key={name} value={name}>
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
