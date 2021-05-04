package com.controle.chamados.service;

import com.controle.chamados.model.Item;
import java.util.List;
import java.util.Optional;

public interface ItemService
{
	List<Item> getAllItem();

	Item getItem(String itemName) throws Exception;

	void saveItem(Item item) throws Exception;

	void deleteItem(List<String> listItems);
}
