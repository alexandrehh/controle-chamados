package com.controle.chamados.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Item
{
	@Id
	private String itemName;

	private String itemStatus;

	public String getItemName()
	{
		return itemName;
	}

	public void setItemName(String itemName)
	{
		this.itemName = itemName;
	}

	public String getItemStatus()
	{
		return itemStatus;
	}

	public void setItemStatus(String itemStatus)
	{
		this.itemStatus = itemStatus;
	}
}
