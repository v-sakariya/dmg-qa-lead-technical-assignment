import { test, expect } from '@playwright/test';

const listItem ='listitem'
const checkBox = 'checkbox'
const button = 'button'
const todoItems = {
    "items1":"Learn NextJS",
    "items2":"Build a todo app",
    "items3":"React Task to be Done",
    "items4":"Learn Playwright test suite"
}
const submitBtnName = 'ADD TODO'

const deleteBtnName = 'Delete'

const inputFieldLabel = 'New Todo'
const urlLink = "http://localhost:3000"

test("Todo Items Check",async ({ page }) => {

    //Navigate to the URL link for Frontend
    await page.goto(urlLink)

    // Checking for default todo items in the list

    await page.getByLabel('Todos').isVisible()

    await page.getByLabel(todoItems.items1).isVisible()

    await page.getByLabel(todoItems.items2).isVisible()

    //check that checkbox is checked or not
    console.log(await page.getByRole(listItem).filter({hasText:todoItems.items1}).getByRole(checkBox).isChecked())  //returns true in the Attachment section of Playwright report

    console.log(await page.getByRole(listItem).filter({hasText:todoItems.items2}).getByRole(checkBox).isChecked())  //returns false in the Attachment section of Playwright report

    await page.waitForTimeout(3000)

    // Adding new todo items to the list
    await page.getByLabel(inputFieldLabel).fill(todoItems.items3)

    await page.getByText(submitBtnName).click()

    await page.getByLabel(todoItems.items3).isVisible()

    await page.getByLabel(inputFieldLabel).fill(todoItems.items4)

    await page.getByText(submitBtnName).click()

    await page.getByLabel(todoItems.items4).isVisible()    

    await page.waitForTimeout(3000)
    // Checkbox functionality working for the application
    await page.getByRole(listItem).filter({hasText:todoItems.items1}).getByRole(checkBox).click()

    await page.getByRole(listItem).filter({hasText:todoItems.items2}).getByRole(checkBox).click()

    await page.getByRole(listItem).filter({hasText:todoItems.items3}).getByRole(checkBox).click()

    await page.getByRole(listItem).filter({hasText:todoItems.items4}).getByRole(checkBox).click()

    // Delete functionality working for new todo items added
    await page.getByRole(listItem).filter({hasText:todoItems.items3}).getByRole(button,{name:deleteBtnName}).click()

    await page.getByRole(listItem).filter({hasText:todoItems.items4}).getByRole(button,{name:deleteBtnName}).click()

    // This test provides an edge case that the input should not be empty
    if((await page.getByLabel(inputFieldLabel).inputValue()).length === 0){
        console.log(await page.getByText(submitBtnName).isDisabled())   // the input field is empty and should be disabled, feature to be added  
    }
    
    await page.waitForTimeout(3000)
})



