package com.controle.chamados.service;

import com.controle.chamados.model.Item;
import com.controle.chamados.repository.ItemRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements ItemService
{
	private final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

	@Autowired
	private ItemRepository repository;

	@Override
	public List<Item> getAllItem()
	{
		return this.repository.findAll();
	}

	@Override
	public Item getItem(String itemId) throws Exception
	{
		Item item = null;

		try
		{
			if (checkItemExists(itemId))
			{
				item = this.repository.findById(itemId).get();
			}
			else
			{
				if (log.isDebugEnabled())
				{
					log.debug("This item not exists!");
				}
			}
		}
		catch (NoSuchElementException e)
		{
			if (log.isErrorEnabled())
			{
				log.error("This item not found!", e);
			}
		}

		return item;
	}

	@Override
	public void saveItem(Item item) throws Exception
	{
		try
		{
			this.repository.save(item);
		}
		catch (Exception e)
		{
			if (log.isErrorEnabled())
			{
				log.error("This item not saved!", e);
			}
		}
	}

	@Override
	public void deleteItem(List<String> listItems)
	{
		try
		{
			for (String item : listItems)
			{
				this.repository.deleteById(item);
			}
		}
		catch (Exception e)
		{
			if (log.isErrorEnabled())
			{
				log.error("This item not deleted!", e);
			}
		}
	}

	private boolean checkItemExists(String item)
	{
		return this.repository.existsById(item);
	}
}
