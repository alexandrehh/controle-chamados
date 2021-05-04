package com.controle.chamados.rest;

import com.controle.chamados.model.Item;
import com.controle.chamados.service.ItemService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/item")
@CrossOrigin("*")
public class ItemRest
{
	@Autowired
	private ItemService itemService;

	@GetMapping(path = "")
	public List<Item> getAllItem()
	{
		return this.itemService.getAllItem();
	}

	@GetMapping(path = "/{itemId}")
	public Item getItem(@PathVariable String itemId) throws Exception
	{
		return this.itemService.getItem(itemId);
	}

	@PostMapping(path = "/save")
	public void saveItem(@RequestBody Item item) throws Exception
	{
		this.itemService.saveItem(item);
	}

	@DeleteMapping(path = "/delete/{listItems}")
	public void deleteItem(@PathVariable List<String> listItems)
	{
		this.itemService.deleteItem(listItems);
	}
}
