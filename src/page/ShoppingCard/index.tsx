import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Divider,
  Paper,
  ListItemAvatar,
  Avatar,
  useMediaQuery,
  Badge,
  Toolbar,
  AppBar,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../Dashboard/store/BasketSelector";
import {
  updateProductCount,
  removeItem,
  removeBasket,
} from "../Dashboard/store/BasketSlice";
import { IAddCount } from "../../core/property.interface";
import { theme } from "../../theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { appColors } from "../../theme/appColors";
import { setDisableAuth } from "../SignUp/components/AuthSlice";

const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectItem = useSelector(selectBasketItems);
  const [cartItems, setCartItems] = useState(selectItem);

  const updateQuantity = (item: IAddCount, newQuantity: number) => {
    if (newQuantity >= 1) {
      const itemCount: IAddCount = {
        id: item.id,
        categoryName: item.categoryName,
        name: item.name,
        count: newQuantity,
        unitPrice: item.unitPrice,
        imageUrl: item.imageUrl,
      };
      dispatch(updateProductCount(itemCount));
    }
  };

  const removeItemProduct = (item: IAddCount) => {
    dispatch(removeItem(item.id));
  };

  const calculateTotal = () => {
    return selectItem.reduce(
      (total, item) => total + (item.unitPrice || 0) * item.count,
      0
    );
  };
  const handleLogout = () => {
    // Reset authorization state
    dispatch(setDisableAuth());
    console.log("User logged out. Token removed.");
  };

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={2}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 3 }}>
        <Toolbar>
          <img
            src={
              "https://i.ibb.co/cTCzD3n/istockphoto-1125921857-612x612-removebg-preview.png"
            }
            alt="Logo"
            style={{ height: 60 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 400 }}
          >
            DECO
          </Typography>
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            // onClick={handleSignUpClick}

            // onClick={handleLogout}
          >
            <Badge
              badgeContent={selectItem.length}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  right: 2,
                  top: 11,
                  backgroundColor: appColors.orange[50],
                },
              }}
            >
              <ShoppingCartIcon
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "100vh",
          display: "flex",
          p: { xs: 0, md: 4 },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid size={{ xs: 12, sm: 8, md: 8 }}>
          <Paper elevation={3} sx={{ p: { xs: 1, md: 3 } }}>
            <Typography variant="h5" gutterBottom>
              Shopping Cart
            </Typography>
            <List>
              {selectItem.length > 0 &&
                selectItem.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      sx={{
                        gap: 2,
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="logo"
                          src={item.imageUrl}
                          sx={{
                            width: { xs: 48, md: 64 },
                            height: { xs: 60, md: 80 },
                            borderRadius: 0,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`LKR${item.unitPrice}`}
                        primaryTypographyProps={{
                          ...(isSmall && { fontSize: "12px" }),
                        }}
                        secondaryTypographyProps={{
                          ...(isSmall && { fontSize: "8px" }),
                        }}
                      />
                      <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                          gap: isSmall ? 0 : 2,
                          // flexDirection: { xs: "column", md: "row" },
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            fontSize: isSmall ? "0.75rem" : "1.25rem",
                          }}
                          onClick={() => updateQuantity(item, item.count - 1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.count}
                          sx={{
                            width: isSmall ? 40 : 50,
                          }}
                          onChange={(e) =>
                            updateQuantity(item, parseInt(e.target.value) || 0)
                          }
                          inputProps={{
                            min: 1,
                            style: {
                              textAlign: "center",
                              width: isSmall ? 30 : 40,
                              fontSize: isSmall ? "1rem" : "1rem",
                            },
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            fontSize: isSmall ? "0.75rem" : "1.25rem",
                          }}
                          onClick={() => updateQuantity(item, item.count + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <ListItemText
                          secondary={`LKR${(item.unitPrice || 0) * item.count}`}
                          secondaryTypographyProps={{
                            ...(isSmall && { fontSize: "8px" }),
                          }}
                          sx={{
                            ...(!isSmall && { ml: 4, mr: 8 }),
                          }}
                        />
                      </Box>

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeItemProduct(item)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
            {selectItem.length > 0 && (
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Total: LKR{calculateTotal().toFixed(2)}
                </Typography>

                <Button
                  fullWidth
                  sx={{
                    mt: 3,
                    width: "200px",
                    mb: 2,
                    color: appColors.white,
                    "&:hover": {
                      bgcolor: appColors.grey,
                      color: appColors.black[100],
                    },
                  }}
                  type="submit"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => dispatch(removeBasket())}
                >
                  Checkout
                </Button>
              </Box>
            )}
            {!(selectItem.length > 0) && (
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Card is Empty</Typography>
                <Button variant="contained" color="primary">
                  Add to purchase
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;
