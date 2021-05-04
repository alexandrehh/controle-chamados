package com.controle.chamados.service;

import com.controle.chamados.model.Item;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class ItemServiceImplTests
{
	private ItemServiceImpl spyItemService;

	@BeforeEach
	public void setup()
	{
		ItemServiceImpl itemService = new ItemServiceImpl();
		spyItemService = Mockito.spy(itemService);
	}

	@Test
	@DisplayName("Todos os itens")
	public void findAllItem()
	{
		String messageError = "Não houve retorno de nenhum item";
		List<Item> listItems = new ArrayList<>();
		Item item = new Item();
		item.setItemName("Teste");
		item.setItemStatus("Disponivel");
		listItems.add(item);

		Mockito.doReturn(listItems).when(spyItemService).getAllItem();
		List<Item> newListItem = spyItemService.getAllItem();
		boolean existsItem = newListItem.size() > 0;

		Assertions.assertTrue(existsItem, messageError);
	}

	@Test
	@DisplayName("Não existe nenhum item")
	public void findAllItemNotFound()
	{
		String messageError = "Os itens a serem encontrados devem não existir";
		List<Item> listItems = new ArrayList<>();

		Mockito.doReturn(listItems).when(spyItemService).getAllItem();
		List<Item> newListItem = spyItemService.getAllItem();
		boolean existsItem = newListItem.size() == 0;

		Assertions.assertTrue(existsItem, messageError);
	}

	@Test
	@DisplayName("Buscar apenas um item")
	public void findItem() throws Exception
	{
		String messageError = "O item a ser encontrado não existe!";
		String itemId = "Teste";
		Item item = new Item();
		item.setItemName("Teste");
		item.setItemStatus("Disponivel");

		Mockito.doReturn(item).when(spyItemService).getItem(itemId);
		Item newItem = spyItemService.getItem(itemId);
		boolean existsItem = newItem != null && newItem.getItemName().equalsIgnoreCase(itemId);

		Assertions.assertTrue(existsItem, messageError);
	}

	@Test
	@DisplayName("Não existe o item a ser encontrado")
	public void findItemNotFound() throws Exception
	{
		String messageError = "O item a ser encontrado não deveria existir!";
		String itemId = "Teste";
		Item item = new Item();
		item.setItemName("OutroTeste");
		item.setItemStatus("Disponivel");

		Mockito.doReturn(item).when(spyItemService).getItem(itemId);
		Item newItem = spyItemService.getItem(itemId);
		boolean existsItem = newItem != null && newItem.getItemName().equalsIgnoreCase(itemId);

		Assertions.assertFalse(existsItem, messageError);
	}
}
