import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Grid,
    Input,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import { presets } from "../../src/style";
const ConfigForm = (props) => {
    // form based cards to enter style based on id
    // selecting id will automatically give out available styles using presets
    // so should pass in jsonResult
    const [cards, setCards] = useState([{ id: "", name: "", text: "" }]);
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

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCards = [...cards];
        updatedCards[index] = { ...updatedCards[index], [name]: value };
        setCards(updatedCards);
    };

    const handleDelete = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const handleAddCard = () => {
        setCards([...cards, { id: "", name: "", text: "" }]);
    };

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const combineStyles = () => {};

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2} justifyContent="left">
                {cards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Custom Style
                                </Typography>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <FormControl fullWidth>
                                        <InputLabel>ID</InputLabel>
                                        <Select
                                            name="id"
                                            value={card.id}
                                            onChange={(e) =>
                                                handleChange(index, e)
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
                                                handleChange(index, e)
                                            }
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        name="style"
                                        label="Style"
                                        value={card.text}
                                        onChange={(e) => handleChange(index, e)}
                                        fullWidth
                                        margin="normal"
                                        sx={{ mt: 2 }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(index)}
                                        sx={{ mt: 2 }}
                                    >
                                        Delete
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        onClick={handleAddCard}
                        sx={{ mt: 2 }}
                    >
                        Add Card
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ConfigForm;
