# You can learn more about package authoring with RStudio at:
#
#   http://r-pkgs.had.co.nz/
#
# Some useful keyboard shortcuts for package authoring:
#
#   Install Package:           'Cmd + Shift + B'
#   Check Package:             'Cmd + Shift + E'
#   Test Package:              'Cmd + Shift + T'

#' Host Function
#'
#' This function uploads your model to the hostr cloud
#' @param model Your R model
#' @param domain Domain, where hoster cloud is hosted (defaults to hostr.so)
#' @keywords host
#' @export
#' @examples
#' host(model)
#' host(model, "https://hostr.example.com")
host <- function(model, domain="http://localhost:3000") {
  # load required packages
  if (!require(jsonlite)) {
    install.packages("jsonlite")
    library(jsonlite)
  }
  if (!require(httr)) {
    install.packages("httr")
    library(httr)
  }

  # get model inputs
  model_attribute = paste(attr(model$terms, "predvars"))
  model_label = model_attribute[-1]
  input_label = model_label[-1]
  input_count = length(input_label)
  # TODO split inputs & outputs
  data_type = c()
  # get model input data types
  for (data in model$data){
    data_type = append(data_type, typeof(data))
  }
  # build dataframe for inputs
  df = cbind(model_label, data_type)
  df = data.frame(df)
  names(df)[names(df) == 'model_label'] = 'variable'
  names(df)[names(df) == 'data_type'] = 'type'
  # build json
  json = sprintf("{\"inputs\": %s}", toJSON(df))
  # TODO add outputs to json
  # TODO upload model & add model to json
  url=sprintf("%s/api/r/host", domain)
  print(url)
  res = POST(url, body = json, encode = "json", content_type_json(), accept_json())
  id = fromJSON(rawToChar(res$content), ".id")
  print(sprintf("You can reach your model at https://%s/%s", domain, id))
}



