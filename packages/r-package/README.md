# hostR

Deploy your R models easily to showcase your model or make it available via API.

> :warning: This repository is still in an early stage of development and isn't functional yet. We love the open source community and want to show what we are working on early. We will update this readme with more information once it is safe to use. Until then, feel free to share your thoughts, contact us, and contribute if you'd like.

---

## How to use

Install the package from GitHub (If you don't have devtools, install it first: `install.packages("devtools")`):

```
devtools::install_github("stackOcean-official/hostr")
```

In your code load the hostR package and after hand the model to our `host` function

```r
library(readr)
library(hostr)

# load data
data = read_csv("https://github.com/stackOcean-official/hostr/files/9681827/pokemon.csv")

# create variables 
legendary = data$is_legendary
attack = data$attack
defense = data$defense

# split train and test data
data = data.frame(legendary, attack, defense)
data_train = data[1:(nrow(data)-100),]
data_test = data[(nrow(data)-99):nrow(data),]

# actual logistic regression
log_reg = glm(legendary ~ attack + defense, data = data_train, family = binomial())
summary(log_reg)


# input for new prediction
attack = 120
defense = 290
test_data_new = data.frame(attack, defense)

# definition of a sigmoid function to normalize predictions
sigmoid = function(x){
  result = exp(x)/(1+exp(x))
  return(result)
}

# actual predicted percentage that pokemon is legendary
sigmoid(predict(log_reg, test_data_new))

# host model 
host(log_reg)
```

---

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.
